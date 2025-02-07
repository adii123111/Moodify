const video = document.getElementById('video');
const detectButton = document.querySelector('.detect-btn');
let isDetectionActive = false;

// Load face detection and expression models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    if (!isDetectionActive) return;

    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    if (detections.length > 0) {
      navigateBasedOnEmotion(detections[0].expressions);
      isDetectionActive = false; // Disable further detection until button is clicked again
      detectButton.disabled = false;
      detectButton.textContent = 'Start Music Detection';
    }
  }, 1000);
});

function navigateBasedOnEmotion(expressions) {
  const emotionThreshold = 0.5;
  const emotions = Object.entries(expressions);
  const [dominantEmotion, confidence] = emotions.reduce((prev, current) => current[1] > prev[1] ? current : prev);

  if (confidence > emotionThreshold) {
    switch (dominantEmotion) {
      case 'happy':
        window.open('https://www.youtube.com/playlist?list=PLgzTt0k8mXzF2fleyxQ17JxeccHFC8Gxp', '_blank');
        break;
      case 'sad':
        window.open('https://www.youtube.com/playlist?list=PL3-sRm8xAzY-w9GS19pLXMyFRTuJcuUjy', '_blank');
        break;
      case 'angry':
        window.open('https://www.youtube.com/watch?v=Vrr3lRLjZ1Y&list=PLknqyEOvGo1YgL11BN1m-YOxaFHl29elY', '_blank');
        break;
      case 'surprised':
        window.open('https://www.youtube.com/playlist?list=PLLd27tZalu3zRpolGDrklbbS1T-L5Lc7g', '_blank');
        break;
      default:
        console.log('Neutral or other emotion detected');
    }
  }
}

// Handle button click to start detection
detectButton.addEventListener('click', () => {
  isDetectionActive = true;
  detectButton.disabled = true;
  detectButton.textContent = 'Detection Active';
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPrkFq30P7ZDdNFVsSfmXWCOXuFYZfx2I",
  authDomain: "login-606ca.firebaseapp.com",
  projectId: "login-606ca",
  storageBucket: "login-606ca.firebasestorage.app",
  messagingSenderId: "120538246243",
  appId: "1:120538246243:web:56a542840db1327d6f1c56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");
  const registerButton = document.getElementById("register-btn");

  // Dummy login credentials
  const VALID_USERNAME = "saeeda";
  const VALID_PASSWORD = "saeeda123";

  // Handle form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameOrEmail = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Dummy authentication check
    if (usernameOrEmail === VALID_USERNAME && password === VALID_PASSWORD) {
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
      return;
    }

    // Firebase Authentication login
    signInWithEmailAndPassword(auth, usernameOrEmail, password)
      .then((userCredential) => {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      })
      .catch((error) => {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid credentials. Please try again.";
      });
  });

  // Register button redirect
  registerButton.addEventListener("click", () => {
    window.open("register.html", "_blank"); // Open register.html in a new tab
  });
});
  // Splash Screen
  const splash = document.querySelector('.splash'); // for splash screen

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      splash.classList.add('display');
    }, 2950); // Delay of 3 seconds
  });

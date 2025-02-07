document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
  
    // Dummy login credentials
    const VALID_USERNAME = "saeeda";
    const VALID_PASSWORD = "saeeda123";
  
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "login.html"; // Redirect to home page
        }, 2000);
      } else {
        loginMessage.textContent = "Invalid username or password. Please try again.";
      }
    });
  });
  

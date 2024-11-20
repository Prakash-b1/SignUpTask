document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    if (!name || !lastName || !email || !username || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastName, email, username, password }),
    });
  
    const result = await response.json();
    alert(result.message);
  });
  


  document.getElementById("togglePassword").addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePassword");
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    
    // Toggle icon (eye to eye-slash)
    toggleButton.innerHTML = isPassword
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  });
  
  document.getElementById("toggleConfirmPassword").addEventListener("click", () => {
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const toggleButton = document.getElementById("toggleConfirmPassword");
    const isPassword = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isPassword ? "text" : "password";
    
    // Toggle icon (eye to eye-slash)
    toggleButton.innerHTML = isPassword
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  });
  
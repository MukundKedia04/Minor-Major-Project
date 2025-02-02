// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("Confirm_password");
  const phone = document.getElementById("phone");

  // Function to validate if passwords match
  const validatePasswords = () => {
      const passwordValue = password.value;
      const confirmPasswordValue = confirmPassword.value;

      // Regular expression to check password requirements
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

      if (!passwordPattern.test(passwordValue)) {
          password.setCustomValidity(
              "Password must be at least 6 characters long, include one uppercase letter, one special character, and one number."
          );
      } else {
          password.setCustomValidity("");
      }

      // Check if passwords match
      if (passwordValue !== confirmPasswordValue) {
          confirmPassword.setCustomValidity("Passwords do not match");
      } else {
          confirmPassword.setCustomValidity("");
      }
  };

  // Function to validate phone number
  const validatePhoneNumber = () => {
      const phonePattern = /^[0-9]{10}$/; // Simple 10-digit phone number pattern
      if (!phonePattern.test(phone.value)) {
          phone.setCustomValidity("Enter a valid 10-digit phone number");
      } else {
          phone.setCustomValidity("");
      }
  };

  // Add event listeners for real-time validation
  password.addEventListener("input", validatePasswords);
  confirmPassword.addEventListener("input", validatePasswords);
  phone.addEventListener("input", validatePhoneNumber);

  // Handle form submission
  form.addEventListener("submit", (e) => {
      validatePasswords();
      validatePhoneNumber();

      if (!form.checkValidity()) {
          e.preventDefault(); // Prevent form submission if validation fails
          alert("Please correct the errors in the form and try again.");
      } else {
          alert("Please Wait");
      }
  });
});


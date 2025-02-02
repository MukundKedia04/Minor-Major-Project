// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-load-form");
  const contactNumber = document.getElementById("contact-number");
  const loadWeight = document.getElementById("weight");

  // Validate contact number
  const validateContactNumber = () => {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(contactNumber.value)) {
          contactNumber.setCustomValidity("Enter a valid 10-digit phone number.");
      } else {
          contactNumber.setCustomValidity("");
      }
  };

  // Validate load weight
  const validateLoadWeight = () => {
      if (loadWeight.value <= 0) {
          loadWeight.setCustomValidity("Load weight must be greater than 0.");
      } else {
          loadWeight.setCustomValidity("");
      }
  };

  // Add real-time validation
  contactNumber.addEventListener("input", validateContactNumber);
  loadWeight.addEventListener("input", validateLoadWeight);

  // Handle form submission
  form.addEventListener("submit", (e) => {
      validateContactNumber();
      validateLoadWeight();

      if (!form.checkValidity()) {
          e.preventDefault(); // Prevent form submission
          alert("Please correct the errors in the form and try again.");
      } else {
          alert("Load details submitted successfully!");
      }
  });
});

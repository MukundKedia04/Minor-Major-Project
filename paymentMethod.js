document.addEventListener('DOMContentLoaded', () => {
  // Tab switching functionality
  function switchTab(tab) {
      // Hide all forms
      document.querySelectorAll('.form-section').forEach(form => {
          form.classList.add('hidden');
      });

      // Reset active tab styles
      document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
      });

      // Show selected form and activate tab
      document.getElementById(`${tab}Form`).classList.remove('hidden');
      document.getElementById(`${tab}Tab`).classList.add('active');
  }
  window.switchTab = switchTab;

  // Card number formatting
  document.getElementById('cardNumber').addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formattedValue = '';
      for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) {
              formattedValue += ' ';
          }
          formattedValue += value[i];
      }
      e.target.value = formattedValue;
  });

  // Expiry date formatting
  document.getElementById('expiry').addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
          value = value.slice(0, 2) + '/' + value.slice(2);
      }
      e.target.value = value;
  });

  // Form validation and submission
  document.getElementById('cardForm').addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate card number
      const cardNumber = document.getElementById('cardNumber');
      const cardNumberValue = cardNumber.value.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumberValue)) {
          document.getElementById('cardNumberError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('cardNumberError').classList.add('hidden');
      }

      // Validate card name
      const cardName = document.getElementById('cardName');
      if (cardName.value.trim().length < 3) {
          document.getElementById('cardNameError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('cardNameError').classList.add('hidden');
      }

      // Validate expiry
      const expiry = document.getElementById('expiry');
      if (!/^\d{2}\/\d{2}$/.test(expiry.value)) {
          document.getElementById('expiryError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('expiryError').classList.add('hidden');
      }

      // Validate CVV
      const cvv = document.getElementById('cvv');
      if (!/^\d{3,4}$/.test(cvv.value)) {
          document.getElementById('cvvError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('cvvError').classList.add('hidden');
      }

      if (isValid) {
          showSuccessMessage();
      }
  });

  // UPI form validation
  document.getElementById('upiForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const upiId = document.getElementById('upiId');
      
      if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId.value)) {
          document.getElementById('upiError').classList.remove('hidden');
      } else {
          document.getElementById('upiError').classList.add('hidden');
          showSuccessMessage();
      }
  });

  // Net Banking form validation
  document.getElementById('netBankingForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const bankSelect = document.getElementById('bankSelect');
      
      if (!bankSelect.value) {
          document.getElementById('bankError').classList.remove('hidden');
      } else {
          document.getElementById('bankError').classList.add('hidden');
          showSuccessMessage();
      }
  });
});

function showSuccessMessage() {
  // Redirect to the dashboard after a successful payment
  window.location.href = 'login.html'; 
}

function resetForms() {
  document.getElementById('successMessage').classList.add('hidden');
  document.getElementById('paymentForm').classList.remove('hidden');
  document.querySelectorAll('form').forEach(form => form.reset());
  switchTab('card');
}


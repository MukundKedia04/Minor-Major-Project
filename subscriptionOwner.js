document.addEventListener("DOMContentLoaded", function() {
  // Function to handle the button click and display plan information
  const buttons = document.querySelectorAll('.plan button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      const planName = event.target.closest('.plan').querySelector('h2').textContent;
      const planPrice = event.target.closest('.plan').querySelector('.price').textContent;
      alert(`You have selected the ${planName} plan with the price of ${planPrice}.`);
    });
  });
});



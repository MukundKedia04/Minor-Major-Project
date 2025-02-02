<?php
require_once 'config.php'; // Include your database configuration

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $plan = $_POST['plan'];
    $email = 'user@example.com'; // Replace with the actual user's email from session or database

    // Simulate payment processing
    // Replace this with actual payment gateway integration
    $paymentSuccessful = processPayment($plan); // Implement this function

    if ($paymentSuccessful) {
        // Update subscription status in the database
        $sql = "UPDATE users SET subscription_status = 'paid' WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        // Redirect to a success page or back to the subscription page
        header("Location: login.html");
        exit();
    } else {
        echo "Payment failed. Please try again.";
    }
}

// Function to simulate payment processing (replace with actual logic)
function processPayment($plan) {
    // Here you would integrate with a payment gateway (e.g., Stripe, PayPal)
    // For now, we simulate a successful payment
    return true; // Change this based on actual payment result
}
?>
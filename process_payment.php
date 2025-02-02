<?php
require_once 'config.php'; 
session_start(); // Start the session at the beginning

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_SESSION['user_id']; 
    $amount = $_POST['amount'];
    $paymentMethod = $_POST['paymentMethod']; 
    $transactionId = ''; 

    /* Here you would add your payment processing logic
    For example, using a payment gateway API to process the payment*/

    $paymentSuccess = true; // Simulate payment success for testing

    if ($paymentSuccess) {
        $sql = "INSERT INTO payments (user_id, amount, payment_method, payment_status, transaction_id) 
                VALUES (:user_id, :amount, :payment_method, 'completed', :transaction_id)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':payment_method', $paymentMethod);
        $stmt->bindParam(':transaction_id', $transactionId); 

        if ($stmt->execute()) {
            // Set session variable to indicate payment success
            $_SESSION['payment_success'] = true;

            // Redirect to the login page
            header("Location: login.html");
            exit(); // Ensure no further code is executed
        } else {
            echo "Error recording payment.";
        }
    } else {
        echo "Payment failed. Please try again.";
    }
}
?>
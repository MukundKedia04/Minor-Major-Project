<?php
require_once 'config.php';
session_start(); // Start the session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role']; // Get the role from the form

    // Prepare SQL statement
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    // Check if user exists
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Debugging output to see the contents of $row
        echo "<pre>";
        print_r($row);
        echo "</pre>";

        // Verify password
        if (password_verify($password, $row['password'])) {
            // Set payment success based on subscription status from the database
            $_SESSION['payment_success'] = (isset($row['subscription_status']) && $row['subscription_status'] === 'paid'); // Check if key exists

            // Debugging output for payment success
            echo "Payment Success: " . (isset($_SESSION['payment_success']) ? $_SESSION['payment_success'] : 'Not Set');

            // Check if payment was successful
            if (!$_SESSION['payment_success']) {
                echo "You must complete the payment before accessing the dashboard.";
                exit();
            }

            // Set user session variables
            $_SESSION['email'] = $row['email'];
            $_SESSION['role'] = $row['role']; // Store user role in session

            // Redirect based on user role
            if ($row['role'] === 'Transporter') { // Check for transporter role
                header("Location: Loading.html"); 
            } elseif ($row['role'] === 'Truck Owner') { // Check for truck owner role
                header("Location: Dashboard.html"); 
            }
            exit();
        } else {
            echo "Incorrect email or password.";
        }
    } else {
        echo "Incorrect email or password.";
    }
}
?>
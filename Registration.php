<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Get form data and validate
        $fullName = isset($_POST['fullName']) ? $_POST['fullName'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';
        $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
        $password = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : '';
        $role = isset($_POST['role']) ? $_POST['role'] : '';

        // Validate required fields
        if (empty($fullName) || empty($email) || empty($phone) || empty($password) || empty($role)) {
            die("All fields are required");
        }

        // Check if email or phone already exists
        $checkUser = "SELECT * FROM users WHERE email = :email OR phone = :phone";
        $stmt = $conn->prepare($checkUser);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo '<script>alert("Email or phone number already exists")</script>';
            exit();
        }

        // Prepare SQL
        $sql = "INSERT INTO users (full_name, email, phone, password, role, subscription_status) 
                VALUES (:fullName, :email, :phone, :password, :role, 'unpaid')";
        
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':fullName', $fullName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':role', $role);

        // Execute
        if ($stmt->execute()) {
            // Placeholder for payment processing logic
            // Replace this with actual payment processing code
            $paymentSuccessful = TRUE; // Set to true only if payment is successful

            // Simulate payment processing
            // Example: $paymentSuccessful = processPayment($paymentDetails);

            if ($paymentSuccessful) {
                // Update subscription status to 'paid' only if payment is successful
                $sql = "UPDATE users SET subscription_status = 'paid' WHERE email = :email";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
            } else {
                // If payment is not successful, do not update the subscription status
                echo "Payment not completed. Access denied.";
                exit();
            }

            // Check subscription status before redirecting
            $checkStatus = "SELECT subscription_status FROM users WHERE email = :email";
            $stmt = $conn->prepare($checkStatus);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user['subscription_status'] === 'paid') {
                // Redirect based on role
                if ($role === 'Transporter') {
                    header("Location: login.html");
                    exit();
                } else if ($role === 'Truck Owner') {
                    header("Location: subscriptionOwner.html");
                    exit();
                }
            } else {
                echo "Payment not completed. Access denied.";
            }
            exit();
        } else {
            echo "Error in registration";
        }
    
    } catch(PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    }
}


?>


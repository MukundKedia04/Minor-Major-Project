<?php
require_once 'config.php';

// Get user ID from URL
$userId = isset($_GET['user_id']) ? $_GET['user_id'] : '';

// Validate user exists
if(!empty($userId)) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    if(!$user) {
        die("Invalid user!");
    }
} else {
    die("User ID not provided!");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Payment Page</title>
    <style>
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Payment Details</h2>
        <form action="process_payment.php" method="POST">
            <input type="hidden" name="user_id" value="<?php echo htmlspecialchars($userId); ?>">
            
            <div class="form-group">
                <label>Card Number:</label>
                <input type="text" name="card_number" required pattern="[0-9]{16}" placeholder="Enter 16 digit card number">
            </div>

            <div class="form-group">
                <label>Card Holder Name:</label>
                <input type="text" name="card_holder" required value="<?php echo htmlspecialchars($user['full_name']); ?>">
            </div>

            <div class="form-group">
                <label>Expiry Date:</label>
                <input type="month" name="expiry" required min="<?php echo date('Y-m'); ?>">
            </div>

            <div class="form-group">
                <label>CVV:</label>
                <input type="password" name="cvv" required pattern="[0-9]{3}" placeholder="Enter 3 digit CVV">
            </div>

            <div class="form-group">
                <label>Amount:</label>
                <input type="number" name="amount" required value="1000" readonly>
                <small>Registration fee: ₹1000</small>
            </div>

            <button type="submit">Process Payment</button>
        </form>
    </div>
</body>
</html> 
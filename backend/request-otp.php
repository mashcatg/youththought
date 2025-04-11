<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data (JSON) and decode it
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Validate email
    $email = isset($data['email']) ? filter_var($data['email'], FILTER_VALIDATE_EMAIL) : null;

    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Check if the email exists in the database
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
        exit;
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId);
        $stmt->fetch();

        // Generate a random 6-digit OTP
        $otp = rand(100000, 999999);
        $hashedOtp = password_hash($otp, PASSWORD_BCRYPT);
        $expiryTime = time() + 300; // OTP expires in 5 minutes

        // Store the hashed OTP and expiry time in the database
        $updateStmt = $conn->prepare("UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?");
        if (!$updateStmt) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
            exit;
        }
        $updateStmt->bind_param("sii", $hashedOtp, $expiryTime, $userId);

        if ($updateStmt->execute()) {
            if ($updateStmt->affected_rows > 0) {
                // Send OTP to the user's email
                mail($email, "Your OTP", "Your OTP is: $otp");

                echo json_encode(['success' => true, 'message' => 'OTP sent to your email.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update OTP in the database.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to execute query: ' . $updateStmt->error]);
        }

        $updateStmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Email does not exist.']);
    }

    $stmt->close();
    $conn->close();
}
?>

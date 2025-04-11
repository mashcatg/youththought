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
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $otp = $_POST['otp'];
    $newPassword = $_POST['newPassword'];

    if (!$email || !ctype_digit($otp) || strlen($otp) !== 6 || strlen($newPassword) < 8) {
        echo json_encode(['success' => false, 'message' => 'Invalid request.']);
        exit;
    }

    // Prepare the SQL statement to fetch the stored OTP and expiry time
    $stmt = $conn->prepare("SELECT id, otp, otp_expiry FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($userId, $storedOtp, $otpExpiry);
    $stmt->fetch();

    // Check if the OTP is valid and not expired
    if (password_verify($otp, $storedOtp) && time() < $otpExpiry) {
        // OTP is valid, proceed to reset the password
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        // Update the user's password in the database and invalidate the OTP
        $stmt = $conn->prepare("UPDATE users SET password = ?, otp = NULL, otp_expiry = NULL WHERE id = ?");
        $stmt->bind_param("si", $hashedPassword, $userId);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Password changed successfully!']);
    } else {
        // OTP is invalid or expired
        echo json_encode(['success' => false, 'message' => 'Invalid or expired OTP.']);
    }

    $stmt->close();
    $conn->close();
}
?>

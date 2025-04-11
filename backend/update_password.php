<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include 'db.php';

$user_id = null;

// Check if the user is authenticated via session or cookie
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
}

// Check if user_id is valid
if (!$user_id) {
    echo json_encode(["error" => "User not authenticated"]);
    exit;
}

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['oldPassword']) || !isset($data['newPassword']) || !isset($data['confirmNewPassword'])) {
    $response['error'] = 'Required parameters missing.';
    echo json_encode($response);
    exit;
}

$old_password = $data['oldPassword'];
$new_password = $data['newPassword'];
$confirm_new_password = $data['confirmNewPassword'];

// Validate new password
if (strlen($new_password) < 6) {
    $response['error'] = 'New password must be at least 6 characters long.';
    echo json_encode($response);
    exit;
}

// Check if new password and confirm new password match
if ($new_password !== $confirm_new_password) {
    $response['error'] = 'New password and confirmation do not match.';
    echo json_encode($response);
    exit;
}

// Fetch the current password hash from the database
$sql = "SELECT password FROM users WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $response['error'] = 'User not found.';
    echo json_encode($response);
    exit;
}

$row = $result->fetch_assoc();
$current_password_hash = $row['password'];

// Verify the old password
if (!password_verify($old_password, $current_password_hash)) {
    $response['error'] = 'Old password is incorrect.';
    echo json_encode($response);
    exit;
}

// Hash the new password
$new_password_hash = password_hash($new_password, PASSWORD_BCRYPT);

// Update the password in the database
$sql = "UPDATE users SET password = ? WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $new_password_hash, $user_id);
$result = $stmt->execute();

if ($result) {
    $response['success'] = 'Password updated successfully.';
} else {
    $response['error'] = 'Failed to update password.';
}

echo json_encode($response);

// Close the MySQLi connection
$conn->close();
?>
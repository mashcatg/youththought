<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
error_reporting(E_ALL);
ini_set('display_errors', 0);

session_start();
include 'db.php';

// Check if the user_id is set in the session
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
} else {
    echo json_encode(['error' => 'User ID not found']);
    exit();
}

// Prepare the SQL statement to prevent SQL injection
$sql = "SELECT profile_picture FROM users WHERE user_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['error' => 'SQL prepare failed']);
    exit();
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($profile_image);

$response = ['imageUrl' => 'default.png']; // Default image URL

if ($stmt->fetch()) {
    $response['imageUrl'] = $profile_image;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

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
$notification_id = $_GET['id'];

if (!$user_id || !$notification_id) {
    echo json_encode(["error" => "Missing parameters"]);
    exit;
}

$sql = "UPDATE notifications SET status = 'Read' WHERE notification_id = ? AND user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $notification_id, $user_id);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(["success" => true]);
?>
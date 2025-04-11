<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];

if (!$user_id) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$sql = "UPDATE notifications SET status = 'Read' WHERE user_id = ? AND status = 'Unread'";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(["success" => true]);
?>
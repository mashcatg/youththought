<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include 'db.php';

// Get the receiver ID from the session
// if (!isset($_SESSION['user_id'])) {
//     echo json_encode(["success" => false, "message" => "User not authenticated."]);
//     exit;
// }
$receiver = 2056; // Use actual session user_id instead of hardcoding

// Validate the sender input
if (!isset($_POST['conversation_id'])) {
    echo json_encode(["success" => false, "message" => "Sender ID is missing."]);
    exit;
}
$sender = intval($_POST['conversation_id']);

$sql = "UPDATE msg SET seen = 1 WHERE sender = ? AND receiver = ? AND seen = 0";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $sender, $receiver);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Messages marked as seen."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to mark messages as seen."]);
}
?>

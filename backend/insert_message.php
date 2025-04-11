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
if (isset($_SESSION['user_id'])) {
  $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
  $user_id = $_COOKIE['user_id'];
}
$sender = $user_id; 
$receiver = $_POST['conversation_id'];
$msg_text = $_POST['message'];
$mediaFile = isset($_FILES['image']) ? $_FILES['image'] : null; // Match the input name
$mediaPath = null;

if ($mediaFile && $mediaFile['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'medias/';
    $fileName = time() . '_' . basename($mediaFile['name']); // Add timestamp for uniqueness
    $targetFilePath = $uploadDir . $fileName;
    
    if (move_uploaded_file($mediaFile['tmp_name'], $targetFilePath)) {
      $mediaPath = $targetFilePath;
    } else {
      echo json_encode(["success" => false, "message" => "Failed to upload media."]);
      exit;
    }
  }
  

$sql = "INSERT INTO msg (sender, receiver, msg_text, msg_time, media) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiss", $sender, $receiver, $msg_text, $mediaPath);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully.",
        "messageId" => $stmt->insert_id,
        "imagePath" => $mediaPath
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send message."]);
}
?>
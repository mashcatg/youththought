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

// Ensure user authentication by checking if a session is active
if (isset($_SESSION['user_id'])) {
  $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
  $user_id = $_COOKIE['user_id'];
}
$currentUserId = $user_id; 
$otherUserId = isset($_GET['otherUserId']) ? (int) $_GET['otherUserId'] : 0;

if ($otherUserId === 0) {
  echo json_encode(["error" => "Invalid user ID"]);
  exit();
}

$lastMessageId = isset($_GET['lastMessageId']) ? (int) $_GET['lastMessageId'] : 0;

$sql = "SELECT * FROM msg WHERE 
        ((sender = ? AND receiver = ?) OR 
        (sender = ? AND receiver = ?)) AND id > ?
        ORDER BY id ASC";
$stmt = $conn->prepare($sql);
if (!$stmt) {
  echo json_encode(["error" => "SQL error: " . $conn->error]);
  exit();
}
$stmt->bind_param("iiiii", $currentUserId, $otherUserId, $otherUserId, $currentUserId, $lastMessageId);
$stmt->execute();
$result = $stmt->get_result();
$messages = $result->fetch_all(MYSQLI_ASSOC);

header("Content-Type: application/json");

$formattedMessages = [];
if ($messages) {
  foreach ($messages as $message) {
    $formattedMessage = [
      'id' => $message['id'],
      'text' => $message['msg_text'],
      'media' => $message['media'],
      'timestamp' => date('c', strtotime($message['msg_time'])),
    ];

    if ($message['sender'] === $currentUserId) {
      $formattedMessage['sender'] = 'me';
    } else {
      $formattedMessage['sender'] = $message['sender'];  // Ensure sender is correct
    }

    $formattedMessages[] = $formattedMessage;
  }
  echo json_encode($formattedMessages);
} else {
  echo json_encode(['error' => 'No messages found']);
}


?>
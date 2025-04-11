<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: GET");
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
$limit = 10; // Number of notifications per page
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$offset = ($page - 1) * $limit;

if (!$user_id) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$sql = "SELECT notification_id, image, texts, link, sent_at, status 
        FROM notifications 
        WHERE user_id = ? 
        ORDER BY sent_at DESC 
        LIMIT ? OFFSET ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $user_id, $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$notifications = [];

while ($row = $result->fetch_assoc()) {
    $notifications[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode(["notifications" => $notifications, "limit" => $limit]);
?>
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Credentials: true");

session_start();

include 'db.php';
$user_id = null;

// Check if the user is authenticated via session or cookie
if (isset($_SESSION['user_id'])) {
    $sender = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $sender = $_COOKIE['user_id'];
}

// Check if user_id is valid
if (!$sender) {
    echo json_encode(["error" => "User not authenticated"]);
    exit;
}


// Get the input data
$data = json_decode(file_get_contents('php://input'), true);
$post_id = $data['post_id'];
// Check if post_id is provided
if (!$post_id) {
    echo json_encode(["error" => "Post ID not provided"]);
    exit;
}
$post_user_sql = "SELECT user_id FROM posts WHERE post_id = ?";
$post_user_stmt = $conn->prepare($post_user_sql);
$post_user_stmt->bind_param("i", $post_id);
$post_user_stmt->execute();
$post_user_result = $post_user_stmt->get_result();
$post_user_data = $post_user_result->fetch_assoc();
$user_id = $post_user_data['user_id'];
date_default_timezone_set('UTC');
$current_time = date('Y-m-d H:i:s');

// Insert the reaction
$sql = "INSERT INTO reactions (user_id, post_id, date) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $user_id, $post_id, $current_time);

if ($stmt->execute()) {
    // Fetch user name and profile picture from the users table
    $user_sql = "SELECT name, profile_picture FROM users WHERE user_id = ?";
    $user_stmt = $conn->prepare($user_sql);
    $user_stmt->bind_param("i", $sender);
    $user_stmt->execute();
    $user_result = $user_stmt->get_result();
    $user_data = $user_result->fetch_assoc();
    $user_name = $user_data['name'];
    $profile_picture = $user_data['profile_picture'];
    $user_stmt->close();

    // Construct the path to the profile picture
    $post_image = "../../public/dp/" . $profile_picture;


    // Insert notification
    $notification_text = "$user_name has Supported you";
    $link = "/post/$post_id";
    $notification_sql = "INSERT INTO notifications (user_id, sender, image, texts, link, sent_at) VALUES (?, ?, ?, ?, ?, ?)";
    $notification_stmt = $conn->prepare($notification_sql);
    $notification_stmt->bind_param("iissss", $user_id, $sender, $post_image, $notification_text, $link, $current_time);
    if ($notification_stmt->execute()) {
        echo json_encode(["success" => "Reaction added and notification sent"]);
    } else {
        echo json_encode(["error" => "Failed to send notification"]);
    }
    $notification_stmt->close();
} else {
    echo json_encode(["error" => "Failed to add reaction"]);
}

$stmt->close();
$conn->close();
?>
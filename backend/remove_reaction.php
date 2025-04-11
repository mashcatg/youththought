<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: DELETE");
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

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);
$post_id = $data['post_id'];

// Check if user is authenticated
if (!$user_id) {
    echo json_encode(["error" => "User not authenticated"]);
    exit;
}

// Delete the reaction
$sql = "DELETE FROM reactions WHERE user_id = ? AND post_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $post_id);
if ($stmt->execute()) {
    echo json_encode(["success" => "Reaction removed"]);
} else {
    echo json_encode(["error" => "Failed to remove reaction"]);
}

$stmt->close();
$conn->close();
?>
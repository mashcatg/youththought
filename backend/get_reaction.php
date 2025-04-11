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
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
}

// Check if user_id is valid
if (!$user_id) {
    echo json_encode(["error" => "User not authenticated"]);
    exit;
}

// Get the post_id from the GET request
$post_id = isset($_GET['post_id']) ? intval($_GET['post_id']) : null;

// Validate post_id
if (!$post_id) {
    echo json_encode(["error" => "Invalid post_id"]);
    exit;
}

try {
    // Check if the user has liked the post
    $liked_sql = "SELECT COUNT(*) AS liked FROM reactions WHERE user_id = ? AND post_id = ?";
    $liked_stmt = $conn->prepare($liked_sql);
    $liked_stmt->bind_param("ii", $user_id, $post_id);
    $liked_stmt->execute();
    $liked_result = $liked_stmt->get_result();
    $liked_row = $liked_result->fetch_assoc();
    $liked = $liked_row['liked'] > 0;

    // Get the total number of reactions for the post
    $count_sql = "SELECT COUNT(*) AS total_reacts FROM reactions WHERE post_id = ?";
    $count_stmt = $conn->prepare($count_sql);
    $count_stmt->bind_param("i", $post_id);
    $count_stmt->execute();
    $count_result = $count_stmt->get_result();
    $count_row = $count_result->fetch_assoc();
    $total_reacts = $count_row['total_reacts'];

    echo json_encode([
        "liked" => $liked,
        "total_reacts" => $total_reacts
    ]);

    $liked_stmt->close();
    $count_stmt->close();
} catch (Exception $e) {
    echo json_encode(["error" => "Error fetching reactions: " . $e->getMessage()]);
}

$conn->close();
?>
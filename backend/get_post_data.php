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

// Get post ID from request (for example via a GET parameter)
$post_id = isset($_GET['post_id']) ? intval($_GET['post_id']) : 0;

if ($post_id > 0) {
    $sql = "SELECT * FROM posts WHERE post_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $post_id);

    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $post = $result->fetch_assoc();

        // Get the user_id from the post data
        $post_user_id = $post['user_id'];

        $count_sql = "SELECT COUNT(*) AS total_reacts FROM reactions WHERE post_id = ?";
        $count_stmt = $conn->prepare($count_sql);
        $count_stmt->bind_param("i", $post_id);
        $count_stmt->execute();
        $count_result = $count_stmt->get_result();
        $count_row = $count_result->fetch_assoc();
        $post['total_reacts'] = $count_row['total_reacts'];

        $sql_liked = "SELECT COUNT(*) as liked FROM reactions WHERE post_id = ? AND user_id = ?";
        $stmt_liked = $conn->prepare($sql_liked);
        $stmt_liked->bind_param("ii", $post_id, $user_id);
        $stmt_liked->execute();
        $result_liked = $stmt_liked->get_result();
        $liked_data = $result_liked->fetch_assoc();
        $post['has_liked'] = $liked_data['liked'] > 0;

        $sql_sum = "SELECT SUM(amount) as total_amount FROM fundings WHERE post_id = ?";
        $stmt_sum = $conn->prepare($sql_sum);
        $stmt_sum->bind_param("i", $post_id);
        $stmt_sum->execute();
        $result_sum = $stmt_sum->get_result();
        $sum_data = $result_sum->fetch_assoc();
        $post['raised_fund'] = $sum_data['total_amount'];

        // Fetch the user details using the user_id from the post
        $user_sql = "SELECT name, profile_picture FROM users WHERE user_id = ?";
        $user_stmt = $conn->prepare($user_sql);
        $user_stmt->bind_param("i", $post_user_id);
        $user_stmt->execute();
        $user_result = $user_stmt->get_result();

        if ($user_result->num_rows > 0) {
            $user = $user_result->fetch_assoc();
            $response = array_merge($post, $user);
            echo json_encode($response);
        } else {
            echo json_encode(["error" => "User not found"]);
        }

        // Close user statement
        $user_stmt->close();
    } else {
        echo json_encode(["error" => "Post not found"]);
    }

    // Close post statement
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid post ID"]);
}

// Close connection
$conn->close();
?>
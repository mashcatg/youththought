<?php

header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include 'db.php';

// Debugging connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$keywords = $_GET['keywords'] ?? '';

// Check if keywords are not empty
if (!empty(trim($keywords))) {
    $keywords = "%{$keywords}%";  // Add wildcard for partial match

    // Prepare the SQL statement with a JOIN to include user data
    $sql = $conn->prepare("
        SELECT posts.*, users.user_id, users.name, users.profile_picture, users.designation
        FROM posts
        JOIN users ON posts.user_id = users.user_id
        WHERE posts.post_description LIKE ?
    ");

    if (!$sql) {
        die(json_encode(["error" => "Prepare failed: " . $conn->error]));
    }

    // Bind the parameters
    $sql->bind_param("s", $keywords);

    // Execute the query
    if (!$sql->execute()) {
        die(json_encode(["error" => "Execute failed: " . $sql->error]));
    }

    // Get the result
    $result = $sql->get_result();

    if (!$result) {
        die(json_encode(["error" => "Get result failed: " . $sql->error]));
    }

    // Fetch all posts with user data
    $posts = $result->fetch_all(MYSQLI_ASSOC);

    // Debugging: Show the number of posts found
    error_log("Number of posts found: " . count($posts));

    echo json_encode($posts);
} else {
    // Return an empty array if no keywords are provided
    echo json_encode([]);
}

?>
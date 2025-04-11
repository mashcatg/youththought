<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include 'db.php';

// Debugging connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 0;

    // Debugging: Print input data
    error_log("offset: " . $offset);

    $sql = $conn->prepare("
        SELECT p.post_id, p.user_id, p.post_type, p.post_description, p.attachment_type, p.file_link, 
                p.currency, p.fund_amount, p.lat, p.lng, p.created_at, p.post_status,
                u.name, u.designation, u.profile_picture 
        FROM posts p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.post_status = 'Active' 
        ORDER BY p.created_at DESC 
        LIMIT 5 OFFSET ?
    ");

    if (!$sql) {
        echo json_encode(["error" => "SQL preparation failed: " . $conn->error]);
        exit();
    }

    $sql->bind_param("i", $offset);
    if (!$sql->execute()) {
        echo json_encode(["error" => "SQL execution failed: " . $sql->error]);
        exit();
    }

    $result = $sql->get_result();

    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }

    // Debugging: Print posts count
    error_log("Posts count: " . count($posts));

    echo json_encode($posts);
} else {
    echo json_encode(["error" => "Invalid request method"]);
    exit();
}
?>
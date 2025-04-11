<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include 'db.php';

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : (isset($_COOKIE['user_id']) ? intval($_COOKIE['user_id']) : null);

    if ($userId === null) {
        echo json_encode(["error" => "User ID not provided"]);
        exit();
    }

    $sql = $conn->prepare("
        SELECT p.post_id, p.user_id, p.post_type, p.post_description, p.attachment_type, p.file_link, 
               p.currency, p.fund_amount, p.lat, p.lng, p.created_at, p.post_status,
               u.name, u.designation, u.profile_picture 
        FROM posts p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.post_status = 'Active' AND p.user_id = ?
        ORDER BY p.created_at DESC 
        LIMIT 5 OFFSET ?
    ");

    if (!$sql) {
        echo json_encode(["error" => "SQL preparation failed: " . $conn->error]);
        exit();
    }

    $sql->bind_param("ii", $userId, $offset);

    if (!$sql->execute()) {
        echo json_encode(["error" => "SQL execution failed: " . $sql->error]);
        exit();
    }

    $result = $sql->get_result();

    $posts = [];
    $serialId = 1;
    while ($row = $result->fetch_assoc()) {
        $row['serial_id'] = $serialId++;
        $posts[] = $row;
    }

    echo json_encode($posts);

    $sql->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
    exit();
}
?>
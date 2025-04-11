<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
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

    $sql = $conn->prepare("
        SELECT user_id, bio, name, designation, email, phone, profile_picture
        FROM users
        WHERE bio LIKE ? OR name LIKE ? OR designation LIKE ? OR email LIKE ? OR phone LIKE ?
    ");

    $sql->bind_param("sssss", $keywords, $keywords, $keywords, $keywords, $keywords);
    $sql->execute();
    $result = $sql->get_result();

    $users = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($users);
} else {
    // Return an empty array or an appropriate message if no keywords are provided
    echo json_encode([]);
}
?>
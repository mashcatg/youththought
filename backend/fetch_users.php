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

// Get the offset from the query parameter
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = 10; // Number of users to fetch

// Query to fetch 10 random users starting from the specified offset
$sql = "SELECT user_id, name, designation, profile_picture 
        FROM users 
        WHERE account_status = 'Active' 
        ORDER BY RAND() 
        LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Debugging query
if ($result === false) {
    die(json_encode(["error" => "Error in SQL query: " . $conn->error]));
}

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();

// Return the users as JSON
echo json_encode($users);

?>
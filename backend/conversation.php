<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/your/php-error.log');

header("Content-Type: application/json");
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not authenticated"]);
    exit();
}

$sender = $_SESSION['user_id'];

$sql = "
    SELECT 
        u.user_id AS contact_id,
        u.name AS contact_name,
        m1.msg_text AS lastMessage,
        m1.msg_time AS date, 
        m1.seen AS seen,
        u.profile_picture AS profilePic
    FROM 
        msg m1
    INNER JOIN (
        SELECT 
            LEAST(sender, receiver) AS user1, 
            GREATEST(sender, receiver) AS user2, 
            MAX(id) AS max_id
        FROM 
            msg
        WHERE 
            sender = ? OR receiver = ?
        GROUP BY 
            user1, user2
    ) m2 ON m1.id = m2.max_id
    INNER JOIN users u ON u.user_id = IF(m1.sender = ?, m1.receiver, m1.sender)
    ORDER BY m1.id DESC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "SQL error: " . $conn->error]);
    exit();
}

// Bind the sender (current user) ID to all the placeholders
$stmt->bind_param("iii", $sender, $sender, $sender);
$stmt->execute();
$result = $stmt->get_result();
$contacts = [];

while ($row = $result->fetch_assoc()) {
    $contacts[] = [
        'id' => $row['contact_id'],
        'name' => $row['contact_name'],
        'lastMessage' => $row['lastMessage'],
        'date' => $row['date'],
        'seen' => $row['seen'],
        'profilePic' => $row['profilePic']
    ];
}

echo json_encode($contacts);
?>
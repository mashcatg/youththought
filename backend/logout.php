<?php
include 'db.php';
// Start the session
session_start();
if(isset($_SESSION['user_id']) || isset($_COOKIE['user_id'])){
$cookie = null;
$user_id = $_SESSION['user_id'];
$update_stmt = $conn->prepare("UPDATE users SET cookie = ? WHERE user_id = ?");
$update_stmt->bind_param("si", $cookie, $user_id);
$update_stmt->execute();
$update_stmt->close();
}
// Unset all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Clear the user_id cookie by setting its expiration time in the past
setcookie("user_id", "", time() - 3600, "/", "", false, true);


header("Location: https://www.youthsthought.com//login");
exit();
?>
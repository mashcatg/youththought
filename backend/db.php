<?php
// Database connection settings
$servername = "localhost";
$username = "ennovatc_youthsthought"; 
$password = "youthsthought1029";
$dbname = "ennovatc_youthsthought";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
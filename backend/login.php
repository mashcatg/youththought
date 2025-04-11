<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 0);

session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'];
    $password = $input['password'];

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT id, user_id, password FROM users WHERE email = ? AND account_status = 'Active'");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $user_id, $hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // start a session and set cookies
            $_SESSION['user_id'] = $user_id;
            $cookie_value = $user_id;

            // Set a 5-month cookie
            setcookie("user_id", $cookie_value, time() + (5 * 30 * 24 * 60 * 60), "/", "", true, true);

            // Optional: Save cookie info to the database (if necessary)
            $update_stmt = $conn->prepare("UPDATE users SET cookie = ? WHERE id = ?");
            $update_stmt->bind_param("si", $cookie_value, $id);
            $update_stmt->execute();
            $update_stmt->close();

            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Your account doesn\'t exist or is deactivated']);
    }

    $stmt->close();
    $conn->close();
}
?>
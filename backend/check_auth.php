<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include'db.php';

$user_id = null;

// Check if the user is authenticated via session or cookie
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
}

// If a user ID is found, proceed to fetch user data
if ($user_id) {
    $stmt = $conn->prepare("SELECT name, email, phone, user_id FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Bind result variables and fetch user data
        $stmt->bind_result($name, $email, $phone, $user_id);
        $stmt->fetch();

        // Set session data for authenticated user
        $_SESSION['user_id'] = $user_id;
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        $_SESSION['phone'] = $phone;

        // Respond with user data and success status
        echo json_encode([
            'status' => 'success',
            'user' => [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'user_id' => $user_id
            ]
        ]);
    } else {
        // User not found in the database
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    }

    $stmt->close();
    $conn->close();
} else {
    // No session or cookie available, return an error
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Not authenticated.']);
}

exit;
?>
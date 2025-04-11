<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include 'db.php';

$user_id = null;

// Check if the user is authenticated via session or cookie
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
} elseif (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
}

if ($user_id) {
    // Profile data retrieval
    $stmt = $conn->prepare("SELECT name, bio, designation, profile_picture FROM users WHERE user_id = ?");
    if ($stmt) {
        $stmt->bind_param("s", $user_id);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($name, $bio, $designation, $profile_pic);
            $stmt->fetch();

            $following_count = 120;
            $follower_count = 238;

            // Set default image if profile_pic is not set or empty
            if (empty($profile_pic)) {
                $profile_pic = 'default.png';
            }

            // Return user details in JSON format
            echo json_encode([
                'status' => 'success',
                'loggedIn' => true,
                'id' => $user_id,
                'name' => $name,
                'designation' => $designation,
                'following_count' => $following_count,
                'follower_count' => $follower_count,
                'profile_pic' => $profile_pic,
                'bio' => $bio
            ]);
        } else {
            // No user found with this user_id
            echo json_encode([
                'status' => 'error',
                'message' => 'User not found or inactive.'
            ]);
        }

        $stmt->close();
    } else {
        // Handle SQL preparation errors
        echo json_encode([
            'status' => 'error',
            'message' => 'Database query failed.'
        ]);
    }
} else {
    // No user_id in session or cookie, meaning user is not logged in
    echo json_encode([
        'status' => 'success',
        'loggedIn' => false
    ]);
}

$conn->close();
?>
<?php
header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include 'db.php';

$user_id = null;

// Check if the user is authenticated via session or cookie
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
}

// Check if user_id is valid
if (!$user_id) {
    echo json_encode(["error" => "User not authenticated"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Log incoming data
    error_log("POST data: " . print_r($_POST, true));
    error_log("FILES data: " . print_r($_FILES, true));

    if (isset($_POST['username']) && isset($_POST['designation']) && isset($_POST['bio'])) {
        $name = $_POST['username'];
        $designation = $_POST['designation'];
        $bio = $_POST['bio'];

        $profilePicPath = $_POST['existingProfilePic'] ?? null; // Default to existing picture

        if (isset($_FILES['profilePic']) && $_FILES['profilePic']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['profilePic']['tmp_name'];
            $dest_path = '../public/dp/';
            $newFileName = $user_id . ".jpg";

            // Check if a file with the same name already exists and delete it
            if (file_exists($dest_path . $newFileName)) {
                unlink($dest_path . $newFileName);
            }

            // Move the uploaded file
            if (move_uploaded_file($fileTmpPath, $dest_path . $newFileName)) {
                $profilePicPath = $dest_path;
            } else {
                error_log("Failed to move uploaded file.");
                $profilePicPath = null;
            }
        }

        // Log the path being used for profile picture
        error_log("Profile picture path: " . $profilePicPath);

        // Update profile data in the database
        $stmt = $conn->prepare("UPDATE users SET name = ?, designation = ?, bio = ?, profile_picture = ? WHERE user_id = ?");
        $stmt->bind_param("ssssi", $name, $designation, $bio, $newFileName, $user_id);

        if ($stmt->execute()) {
            echo json_encode(["success" => "Profile updated successfully."]);
        } else {
            error_log("Error updating profile: " . $conn->error);
            echo json_encode(["error" => "Error updating profile: " . $conn->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Missing profile data"]);
    }
}

$conn->close();
?>
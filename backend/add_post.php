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
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_COOKIE['user_id'])) {
    $user_id = $_COOKIE['user_id'];
} else {
    echo json_encode(['error' => 'User ID not found']);
    exit();
}

// Initialize response
$response = ['status' => 'error', 'message' => 'An unexpected error occurred.'];

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $postType = $_POST['postType'];
    $postDescription = $_POST['postDescription'];
    $attachmentType = $_POST['attachmentType'];
    $fileLink = isset($_POST['fileLink']) ? $_POST['fileLink'] : '';

    function generate_unique_post_id($conn)
    {
        $post_id = rand(1000000, 9999999);
        while (true) {
            $check_sql = "SELECT post_id FROM posts WHERE post_id = ?";
            $stmt = $conn->prepare($check_sql);
            $stmt->bind_param("i", $post_id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows == 0) {
                break;
            } else {
                $post_id = rand(1000000, 9999999);
            }
        }
        return $post_id;
    }

    $unique_post_id = generate_unique_post_id($conn);


    // Initialize variables
    $filePath = '';

    // Handle file upload
    if ($attachmentType === 'image' && isset($_FILES['file'])) {
        $file = $_FILES['file'];
        if ($file['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../public/posts/';
            $fileName = $unique_post_id . ".jpg";
            $fileLink = $fileName;

            if (file_exists($uploadDir . $fileName)) {
                unlink($uploadDir . $fileName);
            }

            // Move the uploaded file to the target directory
            if (move_uploaded_file($file['tmp_name'], $uploadDir . $fileName)) {
                // File uploaded successfully
            } else {
                $response['message'] = 'Failed to upload image.';
                echo json_encode($response);
                exit;
            }
        } else {
            $response['message'] = 'Error uploading image.';
            echo json_encode($response);
            exit;
        }
    }

    // Handle video link
    if ($attachmentType === 'video' && !empty($fileLink)) {
        $fileLink = $fileLink;
    }

    // Handle post type specific fields
    $currency = isset($_POST['currency']) ? $_POST['currency'] : '';
    $fundAmount = isset($_POST['fundAmount']) ? $_POST['fundAmount'] : '';


    if ($postType == "issue") {
        $lat = isset($_POST['lat']) ? $_POST['lat'] : '';
        $lng = isset($_POST['lng']) ? $_POST['lng'] : '';
    } else {
        $lat = NULL;
        $lng = NULL;
    }

    date_default_timezone_set('UTC');
    $current_time = date('Y-m-d H:i:s');

    // Prepare SQL query based on post type
    $sql = "INSERT INTO posts (post_id, user_id, post_type, post_description, attachment_type, file_link, currency, fund_amount, lat, lng, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepare and bind
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisssssisss", $unique_post_id, $user_id, $postType, $postDescription, $attachmentType, $fileLink, $currency, $fundAmount, $lat, $lng, $current_time);

    // Execute query
    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Post added successfully!';
    } else {
        $response['message'] = 'Error inserting post into database.';
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();

// Output response
echo json_encode($response);
?>
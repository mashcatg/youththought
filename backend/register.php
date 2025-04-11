<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ini_set('log_errors', 1);
ini_set('error_log', '/path/to/php-error.log'); // Update this to the correct path

header("Access-Control-Allow-Origin: https://www.youthsthought.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $country_code = filter_var(trim($_POST['country_code']), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password = trim($_POST['password']);

    if (empty($name) || empty($email) || empty($phone) || empty($password) || empty($country_code)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }
    if ($country_code === '0') {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please select a country code."]);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }

    // Check if the email or phone number already exists in the database
    $check_sql = "SELECT id FROM users WHERE email = ? OR phone = ? AND account_status = 'Active'";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("ss", $email, $phone);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email or phone number already exists."]);
        exit;
    }

    // Function to generate unique user ID
    function generate_unique_user_id($conn)
    {
        $user_id = rand(1000000, 9999999);
        while (true) {
            $check_sql = "SELECT id FROM users WHERE user_id = ?";
            $stmt = $conn->prepare($check_sql);
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows == 0) {
                break;
            } else {
                $user_id = rand(1000000, 9999999); // Generate a new random user ID
            }
        }
        return $user_id;
    }

    // Generate unique user ID
    $unique_user_id = generate_unique_user_id($conn);

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data into the database
    $sql = "INSERT INTO users (user_id, name, email, phone, cookie, country_code, account_status, password, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to prepare statement."]);
        exit;
    }

    date_default_timezone_set('UTC');
    $current_time = date('Y-m-d H:i:s');

    $cookie = $unique_user_id; // Assuming cookie should be user_id
    $account_status = "Deactive";

    // Bind parameters
    $stmt->bind_param(
        "issssssss",
        $unique_user_id,
        $name,
        $email,
        $phone,
        $cookie,
        $country_code,
        $account_status,
        $hashed_password,
        $current_time
    );

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Registration failed."]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
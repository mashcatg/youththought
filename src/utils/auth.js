export async function checkAuth() {
  try {
    const response = await fetch(
      "http://localhost/youthsthought/backend/check_auth.php",
      {
        method: "GET",
        credentials: "include", // Ensure cookies are sent
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      return { status: "success" };
    } else {
      return { status: "error" };
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { status: "error" };
  }
}

import React, { useState, useEffect } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import "../index.scss";

const EditProfilePage = () => {
  const [formState, setFormState] = useState({
    username: "",
    designation: "",
    bio: "",
    profilePic: "",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    // Fetch profile data when component mounts
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://www.youthsthought.com/backend/get_profile_data.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.status === "success") {
          setFormState({
            username: data.name,
            designation: data.designation,
            bio: data.bio,
            profilePic: data.profile_pic,
          });
          setPreviewUrl(""); // Clear preview URL if existing image is available
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleProfilePicChange = (file) => {
    const objectURL = URL.createObjectURL(file);
    setPreviewUrl(objectURL);
    setFile(file);
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleProfilePicChange(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleProfilePicChange(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", formState.username);
    formData.append("designation", formState.designation);
    formData.append("bio", formState.bio);
    if (file) {
      formData.append("profilePic", file);
    }
    formData.append("existingProfilePic", formState.profilePic);

    try {
      const response = await fetch(
        "https://www.youthsthought.com/backend/update_profile.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(result.success);
      } else if (result.error) {
        alert(result.error);
      }

      if (response.ok) {
        console.log("Profile updated:", result);
      } else {
        console.error("Server responded with status:", response.status);
        console.error("Server error:", result.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    // Proceed with password change request if passwords match
    console.log("Password change request:", passwordData);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    try {
      const response = await fetch(
        "https://www.youthsthought.com/backend/update_password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are sent
          body: JSON.stringify(passwordData),
        }
      );

      const result = await response.json(); // Assuming the PHP script returns JSON

      if (result.success) {
        alert(result.success);
      } else if (result.error) {
        alert(result.error);
      }

      if (response.ok) {
        console.log("Password updated:", result);
        // Optionally, refresh the profile data or show a success message
      } else {
        console.error("Server responded with status:", response.status);
        console.error("Server error:", result.error);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleCancel = () => {
    setFormState({
      username: formState.username,
      designation: formState.designation,
      bio: formState.bio,
      profilePic: formState.profilePic,
    });
    setPreviewUrl("");
  };

  return (
    <div className="edit-profile-page">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <form onSubmit={handleProfileSubmit} className="edit-profile-form">
            <div className="form__group">
              <div
                className="profile-pic-wrapper"
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <img
                  src={
                    previewUrl ||
                    (formState.profilePic
                      ? "../../public/dp/" + formState.profilePic
                      : "../../public/dp/default.png")
                  }
                  alt="Profile Avatar"
                  className="profile-pic"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <label htmlFor="profilePic" className="upload-btn">
                  Upload New Picture
                </label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="profile-pic-input"
                  onChange={onFileInputChange}
                />
              </div>
            </div>

            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Name"
                name="username"
                id="name"
                value={formState.username}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="name" className="form__label">
                Name
              </label>
            </div>

            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Designation"
                name="designation"
                id="designation"
                value={formState.designation}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="designation" className="form__label">
                Designation
              </label>
            </div>

            <div className="form__group">
              <label htmlFor="bio" className="form__label">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                className="form__field"
                value={formState.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Change Password Section */}
          <form
            onSubmit={handlePasswordSubmit}
            className="change-password-form"
          >
            <h2>Change Password</h2>
            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Old Password"
                name="oldPassword"
                id="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="oldPassword" className="form__label">
                Old Password
              </label>
            </div>

            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="New Password"
                name="newPassword"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="newPassword" className="form__label">
                New Password
              </label>
            </div>

            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="confirmNewPassword" className="form__label">
                Confirm New Password
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="change-password-btn">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default EditProfilePage;

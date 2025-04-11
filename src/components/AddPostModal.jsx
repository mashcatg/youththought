import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../index.scss";
import LoadingScreen from "../components/LoadingScreen";

const AddPostModal = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState({ lat: 23.8103, lng: 90.4125 }); // Default to Dhaka
  const [map, setMap] = useState(null);
  const [postType, setPostType] = useState("issue");
  const [attachmentType, setAttachmentType] = useState("image");
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState("");
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://www.youthsthought.com/backend/get_profile_data.php",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data); // Log the response to inspect it
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postType", postType);
    formData.append("postDescription", e.target.postDescription.value);
    formData.append("attachmentType", attachmentType);

    if (attachmentType === "image" && file) {
      formData.append("file", file);
    } else if (attachmentType === "video") {
      formData.append("fileLink", fileLink);
    }

    if (postType === "crowdfunding") {
      formData.append("currency", e.target.currency.value);
      formData.append("fundAmount", e.target.fundAmount.value);
    }

    if (postType === "issue") {
      formData.append("lat", location.lat);
      formData.append("lng", location.lng);
    }

    try {
      const response = await fetch(
        "https://www.youthsthought.com/backend/add_post.php",
        {
          method: "POST",
          body: formData,
          credentials: "include", // Ensures the session is included in the request
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        alert("Post added successfully!");
        onClose(); // Close the modal after successful submission
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (isOpen && postType === "issue") {
      if (!map) {
        const newMap = L.map("map", {
          center: [location.lat, location.lng],
          zoom: 13,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        const marker = L.marker([location.lat, location.lng]).addTo(newMap);

        newMap.on("click", function (e) {
          marker.setLatLng(e.latlng);
          setLocation(e.latlng);
        });

        setMap(newMap);
      } else {
        map.setView([location.lat, location.lng], 13);
      }
    } else if (!isOpen && map) {
      map.off();
      map.remove();
      setMap(null);
    }
  }, [isOpen, postType, location.lat, location.lng]);

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleAttachmentTypeChange = (e) => {
    setAttachmentType(e.target.value);
    setFile(null);
    setFileLink("");
    setPreview(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileLink("");
      setPreview(URL.createObjectURL(selectedFile));
      uploadFile(selectedFile);
    }
  };

  const handleFileLinkChange = (event) => {
    setFileLink(event.target.value);
    setFile(null);
    setPreview(event.target.value);
  };

  const uploadFile = (file) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("File uploaded successfully");
      } else {
        console.error("Upload failed");
      }
    };

    xhr.send(new FormData().append("file", file));
  };

  const getVideoEmbedUrl = (url) => {
    if (url.includes("youtube.com")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("facebook.com")) {
      const videoId = url.split("/videos/")[1]?.split("?")[0];
      return `https://www.facebook.com/plugins/video.php?href=${url}`;
    }
    if (url.includes("drive.google.com")) {
      const fileId = url.split("id=")[1]?.split("&")[0];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url;
  };

  if (!isOpen) return null;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form__group field">
            <label htmlFor="postType" className="form__label">
              Post Type
            </label>
            <select
              id="postType"
              name="postType"
              className="form__field"
              value={postType}
              onChange={handlePostTypeChange}
            >
              <option value="issue">Issue Post</option>
              <option value="crowdfunding">Crowdfunding Post</option>
              <option value="1percent">The 1% Youths Post</option>
            </select>
          </div>
          <div className="form__group field">
            <textarea
              className="form__field"
              placeholder="Description"
              name="postDescription"
              id="postDescription"
              required
            />
            <label htmlFor="postDescription" className="form__label">
              Description
            </label>
          </div>
          <div className="form__group field">
            <label htmlFor="attachmentType" className="form__label">
              Attachment Type
            </label>
            <select
              id="attachmentType"
              name="attachmentType"
              className="form__field"
              value={attachmentType}
              onChange={handleAttachmentTypeChange}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          {attachmentType === "image" && (
            <div className="form__group">
              <div
                className="file-upload-wrapper"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    handleFileChange({ target: { files: [file] } });
                  }
                }}
              >
                <img
                  src={preview || "https://via.placeholder.com/800x400"}
                  alt="Preview"
                  className="image"
                  style={{ maxWidth: "100%" }}
                />
                <label htmlFor="media" className="upload-btn">
                  Upload New Image
                </label>
                <input
                  type="file"
                  id="media"
                  accept="image/*"
                  className="image-input"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {progress > 0 && (
                <div className="upload-progress">
                  <progress value={progress} max="100" />
                  <span>{progress}%</span>
                </div>
              )}
            </div>
          )}
          {attachmentType === "video" && (
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Link"
                id="fileLink"
                value={fileLink}
                onChange={handleFileLinkChange}
                required
              />
              <label htmlFor="fileLink" className="form__label">
                Video Link
              </label>
              {fileLink && (
                <div className="video-wrapper">
                  <iframe
                    src={getVideoEmbedUrl(fileLink)}
                    title="Video Preview"
                    className="video-preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
          {postType === "crowdfunding" && (
            <>
              <div className="form__group field">
                <label htmlFor="currency" className="form__label">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="form__field"
                  required
                >
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                  <option value="EUR">EUR</option>
                  {/* Add more currencies as needed */}
                </select>
              </div>
              <div className="form__group field">
                <input
                  type="number"
                  className="form__field"
                  placeholder="Fund Amount"
                  id="fundAmount"
                  name="fundAmount"
                  required
                />
                <label htmlFor="fundAmount" className="form__label">
                  Fund Amount
                </label>
              </div>
            </>
          )}
          {postType === "issue" && (
            <>
              <div id="map" style={{ height: "200px", width: "100%" }}></div>
            </>
          )}
          <div className="form-group">
            <button className="btn-submit" type="submit">
              Post
            </button>
            <button className="btn-cancel" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;

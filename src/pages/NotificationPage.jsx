import React, { useEffect, useState, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import "../index.scss";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://www.youthsthought.com/backend/get_notifications.php?page=${page}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Check for duplicates before setting the state
        setNotifications((prev) => {
          const newNotifications = data.notifications.filter(
            (newNotification) =>
              !prev.some(
                (prevNotification) =>
                  prevNotification.notification_id ===
                  newNotification.notification_id
              )
          );
          return [...prev, ...newNotifications];
        });

        if (data.notifications.length < data.limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (hasMore) {
      fetchNotifications();
    }
  }, [page, hasMore]);

  const lastNotificationElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const markAsRead = async (notification_id) => {
    try {
      await fetch(
        `https://www.youthsthought.com/backend/mark_as_read.php?id=${notification_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.notification_id === notification_id
            ? { ...notification, status: "Read" }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(
        "https://www.youthsthought.com/backend/mark_all_as_read.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, status: "Read" }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const formatTime = (sentAt) => {
    const sentTime = new Date(sentAt + "Z");
    const currentTime = new Date();
    const timeDifference = currentTime - sentTime;
  
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const yearsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
  
    if (secondsAgo < 60) {
      return "Just now";
    }
    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
    if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    }
    if (daysAgo < 30) {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
    if (monthsAgo < 12) {
      return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    }
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  };
  

  return (
    <div className="notification-page">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="notification-list">
            <div className="notification-header">
              <h2>Notifications</h2>
              {notifications.length > 0 && (
                <button onClick={markAllAsRead} className="mark-all-read-btn">
                  Mark All as Read
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notifications.map((notification, index) => {
                const isLastElement = index === notifications.length - 1;
                return (
                  <div
                    className={`notification-item ${
                      notification.status === "Unread" ? "unread" : "read"
                    }`}
                    key={notification.notification_id}
                    ref={isLastElement ? lastNotificationElementRef : null}
                    onClick={() => {
                      if (notification.status === "Unread") {
                        markAsRead(notification.notification_id);
                      }
                    }}
                  >
                    <img
                      src={`${notification.image}`}
                      alt="Notification"
                      className="notification-image"
                    />
                    <div className="notification-content">
                      <span className="time">
                        {formatTime(notification.sent_at)}
                      </span>
                      {notification.link ? (
                        <NavLink to={notification.link}>
                          <p>{notification.texts}</p>
                        </NavLink>
                      ) : (
                        <p>{notification.texts}</p>
                      )}
                    </div>
                    {notification.status === "Unread" && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default NotificationPage;

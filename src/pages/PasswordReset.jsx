import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../index.scss";
import logo from "../../public/logo.svg"; // Path to the logo

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpConfirmed, setOtpConfirmed] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle OTP request
const handleOtpRequest = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMessage("");

  try {
    // Log the initiation of the request
    console.log('Initiating OTP request');

    const response = await fetch('https://www.youthsthought.com/backend/request-otp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
      credentials: "include", // Ensure credentials are included
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      console.log("OTP request successful");
      setOtpRequested(true);
      setOtpTimer(300); // Start OTP countdown
    } else {
      console.log("OTP request failed:", data.message);
      setErrorMessage(data.message || "Failed to request OTP.");
    }
  } catch (error) {
    setLoading(false);

    // Enhanced error handling and logging
    console.error("Error during OTP request:", error.message);
    setErrorMessage("Network error. Please try again.");
  }
};

  // Function to handle OTP confirmation
  const handleOtpConfirm = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    fetch('https://www.youthsthought.com/backend/verify-otp.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, otp: otp }),
        credentials: "include", 
    })
    .then(response => response.json())
    .then(data => {
        setLoading(false);
        if (data.success) {
            setOtpConfirmed(true);
        } else {
            setErrorMessage(data.message || "Invalid OTP.");
        }
    })
    .catch(() => {
        setLoading(false);
        setErrorMessage("Network error. Please try again.");
    });
  };

  // Function to handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    fetch('https://www.youthsthought.com/backend/reset-password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, newPassword: newPassword }),
    })
    .then(response => response.json())
    .then(data => {
        setLoading(false);
        if (data.success) {
            setPasswordChanged(true);
        } else {
            setErrorMessage(data.message || "Failed to reset password.");
        }
    })
    .catch(() => {
        setLoading(false);
        setErrorMessage("Network error. Please try again.");
    });
  };

  // Countdown timer for OTP request
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  return (
    <div className="login-page">
      <div className="left-side">
        <div className="animated-text-container">
          <div className="animated-text text-1">Innovation</div>
          <div className="animated-text text-2">Empowerment</div>
          <div className="animated-text text-3">Leadership</div>
          <div className="animated-text text-4">Independence</div>
          <div className="animated-text text-5">Growth</div>
        </div>

        <div className="content-wrapper">
          <h1 className="profile-title">The 1% Youth</h1>
          <div className="profile-story">
            <p>
              John is a passionate software engineer with over 10 years of
              experience in developing scalable web applications. He enjoys
              working with React, Node.js, and cloud technologies.
            </p>
          </div>
          <div className="profile-details">
            <img src="../dp1.jpg" alt="Profile" className="profile-pic" />
            <div className="details-text">
              <h2 className="profile-name">John Doe</h2>
              <p className="profile-status">Software Engineer at ABC Corp</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="login-box">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="welcome-message">
            <p>
              Welcome back! Please enter your email to get OTP and reset your
              password.
            </p>
          </div>
          <form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!otpRequested && (
              <>
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                </div>
                <button onClick={handleOtpRequest} disabled={loading || otpTimer > 0}>
                  {loading ? "Requesting OTP..." : `Get OTP ${otpTimer > 0 ? `(${otpTimer}s)` : ""}`}
                </button>
              </>
            )}

            {otpRequested && !otpConfirmed && (
              <>
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="OTP"
                    name="otp"
                    id="otp"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <label htmlFor="otp" className="form__label">
                    OTP
                  </label>
                </div>
                <button onClick={handleOtpConfirm} disabled={loading}>
                  {loading ? "Verifying OTP..." : "Confirm OTP"}
                </button>
              </>
            )}

            {otpConfirmed && !passwordChanged && (
              <>
                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    placeholder="New Password"
                    name="newPassword"
                    id="newPassword"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="newPassword" className="form__label">
                    New Password
                  </label>
                </div>
                <button onClick={handlePasswordChange} disabled={loading}>
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              </>
            )}

            {passwordChanged && (
              <div className="password-changed-message">
                <p>Password changed successfully!</p>
                <NavLink to="/">
                  <button>Go to Home</button>
                </NavLink>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

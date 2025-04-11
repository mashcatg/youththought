import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom"; 
import "../index.scss";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import logo from "../../public/logo.png";
import { checkAuth } from "../utils/auth"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const authData = await checkAuth();
        if (authData.status === "success") {
          navigate("/"); 
        }
      } catch (error) {
        console.error("Session verification failed:", error);
      }
    };
    verifySession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://www.youthsthought.com/backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        navigate("/"); // Redirect to home after successful login
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <p>Welcome back! Please log in to your account.</p>
          </div>
          {/* <div className="social-login">
            <button>
              <FaGoogle style={{ marginRight: "10px" }} />
              Sign in with Google
            </button>
            <button>
              <FaFacebookF style={{ marginRight: "10px" }} />
              Sign in with Facebook
            </button>
          </div> */}
          <div className="divider">
            <span>Let's get started</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form__group field">
              <input
                type="email"
                className="form__field"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="form__label">
                Email
              </label>
            </div>
            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>
            <NavLink to="/password-reset">
              <div className="forgot-password">
                <a href="#forgot-password">Forgot Password?</a>
              </div>
            </NavLink>
            <button type="submit">Login</button>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <NavLink to="/register">
            <div className="create-account">
              <button type="submit">Create an Account</button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../index.scss";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import logo from "../../public/logo.png";
import PhoneInput from "../components/PhoneInput";
import { checkAuth } from "../utils/auth";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    country_code: "+880", // Initialize with the default value
  });

  const navigate = useNavigate(); // Import useNavigate hook

  useEffect(() => {
    const verifySession = async () => {
      try {
        const authData = await checkAuth();
        if (authData.status === "success") {
          navigate("/login"); // Redirect to login page if already logged in
        }
      } catch (error) {
        console.error("Session verification failed:", error);
      }
    };

    verifySession();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullData = {
      ...formData,
      phone: formData.phone,
      country_code: formData.country_code, // Make sure it's included here
    };

    fetch("https://www.youthsthought.com/backend/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(fullData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          alert(
            "Registration successful! Please check your email including spam box to activate your account."
          );
          navigate("/"); // Redirect to login page after successful registration
        } else {
          alert("Registration failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            <p>
              Welcome! Please fill out the form below to create your account.
            </p>
          </div>
          {/* <div className="social-login">
            <button>
              <FaGoogle style={{ marginRight: "10px" }} />
              Sign up with Google
            </button>
            <button>
              <FaFacebookF style={{ marginRight: "10px" }} />
              Sign up with Facebook
            </button>
          </div> */}
          <div className="divider">
            <span>Let's get started</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Name"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className="form__label">
                Name
              </label>
            </div>
            <PhoneInput
              countryCode={formData.country_code}
              phoneNumber={formData.phone}
              setCountryCode={(value) =>
                setFormData({ ...formData, country_code: value })
              }
              setPhoneNumber={(value) =>
                setFormData({ ...formData, phone: value })
              }
            />
            <div className="form__group field">
              <input
                type="email"
                className="form__field"
                placeholder="Email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <NavLink to="/login">
            <div className="create-account">
              <button type="submit">Login</button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;

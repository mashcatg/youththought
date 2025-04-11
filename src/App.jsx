import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Inbox = lazy(() => import("./pages/Inbox"));
const PostPage = lazy(() => import("./pages/PostPage"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const SearchResult = lazy(() => import("./pages/SearchResult"));

function App() {
  return (
    <Router>
      <div className="app">
        <Suspense
          fallback={
            <div className="loading-container">
              <div className="loading-animation">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
              </div>
            </div>
          }
        >
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/:userId1" element={<Inbox />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/search/:keywords" element={<SearchResult />} />
              <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

        </Suspense>
      </div>
    </Router>
  );
}

export default App;

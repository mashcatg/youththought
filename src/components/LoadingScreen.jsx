import React from "react";
import "../App.scss"; // Assuming you have a separate SCSS file for the loading styles

const LoadingScreen = () => (
  <div className="loading-container">
    <div className="loading-animation">
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </div>
  </div>
);

export default LoadingScreen;

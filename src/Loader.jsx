import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300);

          return 100;
        }

        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader-screen">

      {/* FreshMart Logo */}
      <div className="loader-logo">
        <div className="logo-icon">🛒🥬</div>

        <div>
          <div className="logo-name">
            <span>Fresh</span>
            <span>Mart</span>
          </div>

          <div className="logo-tagline">
            Freshness at Your Doorstep
          </div>
        </div>
      </div>

      {/* Background Clouds */}
      <div className="loader-cloud cloud-one"></div>
      <div className="loader-cloud cloud-two"></div>

      {/* Road Area */}
      <div className="loader-road-area">

        {/* Bike */}
        <div
          className="loader-bike"
          style={{
            left: `${Math.min(progress, 100) * 0.78 + 8}%`,
          }}
        >
          <div className="bike-motion motion-one"></div>
          <div className="bike-motion motion-two"></div>

         <div
  className="loader-bike"
  style={{
    left: `${Math.min(progress, 100) * 0.78 + 8}%`,
  }}
>
  <div className="bike-motion motion-one"></div>
  <div className="bike-motion motion-two"></div>
  <img
    src="/public/categories/bike.png"
    alt="Delivery Bike"
    className="delivery-bike"
  />
</div>

          <div className="delivery-box">
            🥬
          </div>
        </div>

        {/* Road */}
        <div className="loader-road">
          <div className="road-lines"></div>
        </div>

      </div>

      {/* Progress */}
      <div className="loader-progress-wrapper">

        <div className="loader-progress">
          <div
            className="loader-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="loader-percentage">
          {progress}%
        </div>

      </div>

    </div>
  );
};

export default Loader;
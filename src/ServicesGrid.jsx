import React from "react";
import "./ServiceGrid.css";

const ServicesGrid = ({ title, url, des }) => {
  return (
    <div className="grid">
      <div className="head-section">
        <img height="58px" src={url} alt="" />
        <span className="heading">{title}</span>
      </div>
      <span className="des">{des}</span>
    </div>
  );
};

export default ServicesGrid;

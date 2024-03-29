import React, { useRef } from "react";
import "./index.scss";

const WorkspaceCard = ({ onClick }) => {
  // const handleClick =()=>{

  // }

  // const handleMenuClick =()=>{

  // }
  return (
    <div className="c-workspace-card" onClick={onClick}>
      <img className="c-workspace-card__img" src="/workspace-card-img.png" />
      <div className="c-workspace-card__details">
        <div className="c-workspace-card__details-section">
          <span className="c-workspace-card__details-header">
            Workspace Name
          </span>
          <span className="c-workspace-card__details-modified">
            Modified By user.name
          </span>
        </div>
        <img
          className="c-workspace-card__details-menu"
          src="/icons/three-dots.png"
          onChange={() => {

          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceCard;

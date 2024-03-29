import React, { useState } from "react";
import "./index.scss";
import ButtonCombo from "../buttonCombo";
import StickyNote from "../stickyNote";

const Container = ({ disable = true, width, template, handleDelete}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("Initial Value");
  const [sticky, setSticky] = useState([{ id: 0, content: "" }, { id: 1, content: "" }]);
  const [active, setActive] = useState("rgb(223, 255, 0)");

  console.log(width);
  const colors = [
    "rgb(223, 255, 0)",
    "rgb(252, 242, 129)",
    "rgb(255, 127, 80)",
    "rgb(254, 187, 190)",
    "rgb(159, 226, 191)",
    "rgb(64, 224, 208)",
    "rgb(135, 206, 250)",
    "rgb(204, 204, 255)",
  ];
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (id, event) => {
    event.stopPropagation();
    event.preventDefault();
    const updatedTextAreas = sticky.map((area) => {
      if (area.id === id) {
        return { ...area, content: event.target.value };
      }
      return area;
    });

    setSticky(updatedTextAreas);
    // socket.emit('textUpdate', updatedTextAreas); // Emit the updated areas
  };

  const handleDeleteSticky = (id) => {
    setSticky(sticky.filter((obj) => obj.id !== id))
  }

  return (
    <div className="c-container"
      style={{
        width: `${template == "temp-column" ? (width + "%") : "100%"}`,
      }}>
      <div className="c-container__header">
        <div className="c-container__header-detail">
          <span className="c-container__header-name">User Name</span>
          {isEditing ? (
            <input
              className="c-container__header-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span className="c-container__header-input">{inputValue}</span>
          )}
        </div>
        <img
          className={`c-container__header-menu ${isMenuOpen && "c-container__header-menu--active"
            }`}
          src={"/icons/edit-black.png"}
          onClick={handleEditClick}
        />
      </div>
      <div className={template == "temp-column" ? "c-container__body" : "c-container__body--row"}>
        {sticky.map((sticky) =>
          <StickyNote
            key={sticky.id}
            value={sticky.content}
            onChange={(value) => handleChange(0, value)}
            color={active}
            colors={colors}
            active={active}
            onClick={(e) => {
              setActive(e.target.style.backgroundColor);
            }}
            parentWidth={800}
            parentHeight={600}
            handleDelete={() => handleDeleteSticky(sticky.id)}
          />
        )}
      </div>
      <div className="c-container__footer">
        <img 
        src="/icons/delete-red.png" 
          onClick={handleDelete}
        />
        <img
          src={`${isEditing
            ? "/icons/tick-circle-green.png"
            : "/icons/tick-circle.png"
            }`}
        />
      </div>
    </div>
  );
};

export default Container;

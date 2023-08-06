import React, { useState } from "react";
import styles from "../styles/CreateGroupModal.module.css";

const groupAvatarColors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const SelectColor = (props) => {
  const [selectedColor, setSelectedColor] = useState(groupAvatarColors[0]);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    props.handleSelectedColor(color);
  };

  return (
    <span>
      {groupAvatarColors.map((color) => {
        return (
          <button
            key={color}
            style={{
              backgroundColor: `${color}`,
              border: selectedColor === color ? "1px solid black" : "none",
            }}
            className={styles.colorPicker}
            onClick={() => handleSelectColor(color)}
          ></button>
        );
      })}
    </span>
  );
};

export default SelectColor;

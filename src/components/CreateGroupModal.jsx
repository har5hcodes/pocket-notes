import React, { useState } from "react";
import styles from "../styles/CreateGroupModal.module.css";
import SelectColor from "./SelectColor";

const CreateGroupModal = (props) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#B38BFA");
  const [showError, setShowError] = useState(false);
  const handleSelectedColor = (color) => {
    setSelectedColor(color);
  };
  const clearModalForm = () => {
    setGroupName("");
    setSelectedColor("#B38BFA");
    props.closeCreateGroupModal();
  };
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={styles.textstyle} style={{ fontSize: "1.25rem" }}>
            Create New Notes Group
          </div>
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
            onClick={props.closeCreateGroupModal}
          >
            X
          </div>
        </div>

        <div className={styles.rowContainer}>
          <span className={styles.textstyle}>Group Name</span>
          <input
            onChange={(e) => setGroupName(e.target.value)}
            style={{
              borderColor: showError ? "red" : "#cccccc",
            }}
            className={styles.inputField}
            type="text"
            value={groupName}
            placeholder="Enter your group name..."
          />
        </div>

        <div className={styles.rowContainer}>
          <span className={styles.textstyle}>Choose color</span>
          <SelectColor handleSelectedColor={handleSelectedColor} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              if (groupName !== "") {
                props.handleCreateGroup(groupName, selectedColor);
                clearModalForm();
              }
              setShowError(true);
            }}
            className={styles.createBtn}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;

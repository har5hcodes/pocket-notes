import React from "react";
import styles from "../styles/Sidebar.module.css";

const NotesTab = (props) => {
  const handleDisplayGroupNotes = () => {
    props.handleActiveGroup(props.groupName);
    props.handleDisplayNotesContent(props.groupDetails);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        borderTopLeftRadius: "1.4rem",
        borderBottomLeftRadius: "1.4rem",
        padding: "0.6rem 0 0.6rem 1rem",
        marginLeft: "2rem",

        cursor: "pointer",
        backgroundColor: props.isActive ? "#f7ecdc" : "#ffffff",
      }}
      onClick={handleDisplayGroupNotes}
    >
      <span
        style={{ backgroundColor: `${props.groupAvatarColor}` }}
        className={styles.notesAvatar}
      >
        {props.groupAvatar}
      </span>
      <span className={styles.notesTitle}>{props.groupName}</span>
    </div>
  );
};

export default NotesTab;

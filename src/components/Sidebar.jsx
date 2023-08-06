import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import NotesTab from "./NotesTab";

const Sidebar = (props) => {
  const [activeGroup, setActiveGroup] = useState("");

  const handleActiveGroup = (groupName) => {
    setActiveGroup(groupName);
  };
  return (
    <div className={styles.sidebarContainer}>
      <div
        className={styles.sidebarHeader}
        onClick={() => {
          props.handleDisplayDashboard();
          setActiveGroup("");
        }}
      >
        Pocket Notes
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={props.openCreateGroupModal}
          className={styles.createBtn}
        >
          + Create Notes group
        </button>
      </div>

      <div className={styles.notesTabContainer}>
        {props.notesData.map((group) => {
          return (
            <NotesTab
              key={group.name}
              groupDetails={group}
              groupAvatar={group.avatar}
              groupAvatarColor={group.color}
              groupName={group.name}
              isActive={group.name === activeGroup}
              handleDisplayNotesContent={props.handleDisplayNotesContent}
              handleActiveGroup={handleActiveGroup}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

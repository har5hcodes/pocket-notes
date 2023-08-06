import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/NotesContent.module.css";
import textSubmitIcon from "../assets/textSubmitIcon.png";
import backIcon from "../assets/backIcon.png";

const NotesContent = (props) => {
  const [note, setNote] = useState("");
  const notesTabRef = useRef(null);
  useEffect(() => {
    if (notesTabRef.current) {
      notesTabRef.current.scrollTop = notesTabRef.current.scrollHeight;
    }
  }, [note]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.navbar}>
          {props.isMobile && (
            <img
              onClick={props.handleHideNotesContent}
              src={backIcon}
              alt=""
              style={{ cursor: "pointer" }}
            />
          )}
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <span
              style={{ backgroundColor: `${props.groupAvatarColor}` }}
              className={styles.notesAvatar}
            >
              {props.groupAvatar}
            </span>
            <span className={styles.notesTitle}>{props.groupName}</span>
          </div>
        </div>

        <div
          ref={notesTabRef}
          style={{ overflowY: "scroll", backgroundColor: "#f7ecdc" }}
        >
          {props.groupNotes.map((note) => {
            return (
              <div className={styles.noteContainer}>
                <div>
                  <p
                    style={{
                      marginBottom: "2px",
                    }}
                  >
                    {note.time}
                  </p>
                  <p>{note.date}</p>
                </div>
                <div>{note.text}</div>
              </div>
            );
          })}
        </div>

        <div className={styles.textContainer}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={styles.textArea}
              placeholder="Enter your text here......."
            />
            <img
              onClick={() => {
                props.handleAddNewNote(note, props.groupName);
                setNote("");
              }}
              className={styles.textBtn}
              src={textSubmitIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesContent;

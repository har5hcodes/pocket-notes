import React from "react";
import styles from "../styles/DashboardContent.module.css";
import lockIcon from "../assets/lockIcon.png";
import dashboardImg from "../assets/dashboardImg.png";

const DashboardContent = () => {
  return (
    <div className={styles.container}>
      <img src={dashboardImg} alt="" />
      <p className={styles.header}>Pocket Notes</p>
      <p className={styles.subHeader}>
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          color: "#292929",
          fontWeight: "400",
          position: "absolute",
          bottom: "2rem",
        }}
      >
        <span>
          <img src={lockIcon} alt="lock-icon" />
        </span>
        <span
          style={{
            fontWeight: "400",
          }}
        >
          end-to-end encrypted
        </span>
      </div>
    </div>
  );
};

export default DashboardContent;

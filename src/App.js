import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NotesContent from "./components/NotesContent";
import styles from "./styles/App.module.css";
import CreateGroupModal from "./components/CreateGroupModal";
import DashboardContent from "./components/DashboardContent";

function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function formatDate(date) {
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust the breakpoint as needed
    };

    handleResize(); // Check the screen size on component mount

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [notesData, setNotesData] = useState(() => {
    const savedNotesData = localStorage.getItem("notesData");
    return savedNotesData ? JSON.parse(savedNotesData) : [];
  });

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notesData));
  }, [notesData]);

  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [groupDetails, setGroupDetails] = useState({});
  const [displayDashboard, setDisplayDashboard] = useState(true);
  const [displayNotesContent, setDisplayNotesContent] = useState(false);

  const handleDisplayDashboard = () => {
    setDisplayDashboard(true);
    setDisplayNotesContent(false);
  };

  const handleDisplayNotesContent = (groupDetails) => {
    setGroupDetails(groupDetails);
    setDisplayNotesContent(true);
    setDisplayDashboard(false);
  };

  const handleHideNotesContent = () => {
    setDisplayNotesContent(false);
  };

  const openCreateGroupModal = () => {
    setCreateGroupModalOpen(true);
  };

  const closeCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
  };

  const handleCreateGroup = (name, color) => {
    const clearAndExtractLetters = (name) => {
      const trimmedName = name.replace(/\s/g, "");
      const extractedLetters = trimmedName.slice(0, 2).toUpperCase();
      return extractedLetters;
    };
    const newGroup = {
      avatar: clearAndExtractLetters(name),
      name: name,
      color: color,
      notes: [],
    };
    setNotesData((prev) => [...prev, newGroup]);
  };

  // Create the newNote object with the current time and date

  const handleAddNewNote = (note, name) => {
    const currentTime = new Date();
    const newNote = {
      text: note,
      time: formatTime(currentTime),
      date: formatDate(currentTime),
    };
    const group = notesData.find((group) => group.name === name);
    if (group) {
      group.notes.push(newNote);
      setNotesData([...notesData]);
    } else {
      console.log("Group not found.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        {isMobile && displayNotesContent ? null : (
          <Sidebar
            handleDisplayDashboard={handleDisplayDashboard}
            handleDisplayNotesContent={handleDisplayNotesContent}
            notesData={notesData}
            openCreateGroupModal={openCreateGroupModal}
          />
        )}
        {isMobile ? null : displayDashboard && <DashboardContent />}
        {displayNotesContent && (
          <NotesContent
            groupName={groupDetails.name}
            groupAvatar={groupDetails.avatar}
            groupAvatarColor={groupDetails.color}
            groupNotes={groupDetails.notes}
            isMobile={isMobile}
            handleAddNewNote={handleAddNewNote}
            handleHideNotesContent={handleHideNotesContent}
          />
        )}
      </div>
      {isCreateGroupModalOpen && (
        <CreateGroupModal
          closeCreateGroupModal={closeCreateGroupModal}
          handleCreateGroup={handleCreateGroup}
        />
      )}
    </>
  );
}

export default App;

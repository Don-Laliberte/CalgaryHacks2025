import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstance.js";
import Modal from "../components/Modal.jsx";
import "./Leaderboard.css";

const Leaderboard = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axiosInstance.get("/api/leaderboard");
        console.log(response.data);
        const sortedUsers = response.data.sort((a, b) => b.level - a.level);
        console.log(sortedUsers);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Global Leaderboards</h2>
      <div className="leaderboard-list">
        {users.map((user, index) => (
          <div key={index} className="leaderboard-card">
            <img 
              src={user.profilePicture} 
              alt={user.username} 
              className="avatar" 
              onError={(e) => { e.target.src = "/default-avatar.png"; }} 
            />
            <span className="username">{user.username}</span>
            <span className="level">Level {user.level}</span>
          </div>
        ))}
      </div>
    </div>
    </Modal>
  );
};

export default Leaderboard;

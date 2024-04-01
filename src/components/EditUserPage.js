// EditUserPage.jsx

import React, { useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";

const EditUserPage = ({ userId, username, onClose }) => {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState(username);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSave = async () => {
    const saveData = {
      newUser: newUsername,
      userId: userId,
    };

    try {
      await axios.put(`/users/${userId}`, saveData, { headers: authHeader() });
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <label htmlFor="username">New Username:</label>
      <input
        type="text"
        id="username"
        value={newUsername}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/admin")}>Cancel</button>
    </div>
  );
};

export default EditUserPage;

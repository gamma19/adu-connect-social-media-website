import React, { useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const EditUserPage = ({ userId, username, onClose }) => {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState(username);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSave = (userId) => {
    const saveData = {
      userId: currentUser.id,
      newUser: newUsername,
    };

    axios
      .put(`/users/${userId}`, saveData, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <button onClick={() => handleSave(currentUser.id)}>Save</button>
      <button onClick={() => navigate("/admin")}>Cancel</button>
    </div>
  );
};

export default EditUserPage;

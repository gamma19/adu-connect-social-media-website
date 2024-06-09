import React, { useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const EditUserPage = ({ id, username, onClose }) => {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState(username);
  const [oldUserId, setUserId] = useState("");

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSave = () => {
    const saveData = {
      id: oldUserId,
      username: newUsername,
    };

    axios
      .put(`/users/updateUserName`, saveData, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <h2>Edit User</h2>
      &nbsp; &nbsp;
      <label htmlFor="userId">Enter User's User ID:</label>
      &nbsp; &nbsp;
      <input
        type="text"
        id="userId"
        value={oldUserId}
        onChange={handleUserIdChange}
      />
      <br></br>
      &nbsp; &nbsp;
      <label htmlFor="username">New Username:</label>
      &nbsp; &nbsp;
      <input
        type="text"
        id="username"
        value={newUsername}
        onChange={handleUsernameChange}
      />
      <br></br>
      &nbsp; &nbsp;
      <button onClick={() => handleSave()}>Save</button>
      &nbsp; &nbsp;
      <button onClick={() => navigate("/admin")}>Cancel</button>
    </div>
  );
};

export default EditUserPage;

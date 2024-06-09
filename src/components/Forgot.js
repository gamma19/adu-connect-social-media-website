import React, { useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Forgot = ({ id, password, onClose }) => {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(password);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleForgot = (userId) => {
    const forgot = {
      userId: currentUser.id,
      newPassword: newPassword,
    };

    axios
      .put(`/users/updatePassword`, forgot, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2> Yeni Şifreyi Girin </h2>
      <label htmlFor="username">Yeni Şifre:</label>
      <input
        type="password"
        id="username"
        value={newPassword}
        onChange={handlePasswordChange}
      />
      <button onClick={() => handleForgot(currentUser.id)}>Save</button>
      <button onClick={() => navigate("/login")}>Cancel</button>
    </div>
  );
};

export default Forgot;

//import React from "react";
import authHeader from "./auth-header";
import { useEffect, useState } from "react";
//import axios from "axios";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState("");
  useEffect(() => {
    fetch("/users", { headers: authHeader() })
      .then((res) => {
        setUsers(res.data);
        console.log(users);
      })
      .catch((err) => setUsersError(err.toString()));
  }, []);

  return { users, usersError };
};

export default useUsers;

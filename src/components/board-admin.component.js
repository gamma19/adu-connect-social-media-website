import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useParams } from "react-router-dom";
import { CCol, CRow } from "@coreui/react";
import { CWidgetStatsC } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { motion } from "framer-motion";
import {
  cilChartPie,
  cilClipboard,
  cilCommentBubble,
  cilCommentSquare,
  cilUser,
} from "@coreui/icons";
import { CTable } from "@coreui/react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./BoardAdmin.css";

const data = [
  { id: 0, value: 10, label: "Admin" },
  { id: 1, value: 15, label: "Moderator" },
  { id: 2, value: 20, label: "Kullanıcı" },
];

const BoardAdmin = () => {
  const { userId } = useParams();
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const columns = [
    {
      key: "id",
      label: "#",
      _props: { scope: "col" },
    },
    {
      key: "class",
      label: "Kullanıcı Adı",
      _props: { scope: "col" },
    },
    {
      key: "heading_1",
      label: "Roller",
      _props: { scope: "col" },
    },
    {
      key: "heading_2",
      label: "Düzenle/Sil",
      _props: { scope: "col", display: "flex" },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users`, { headers: authHeader() });
        const data = response.data;

        const transformedData = data.map((item) => ({
          id: item.id,
          class: item.username, // Assuming 'class' is the username
          heading_1: (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "1em",
              }}
            >
              {item.roles
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((role) => {
                  let backgroundColor;
                  let color;
                  let displayText;
                  switch (role.name) {
                    case "ROLE_ADMIN":
                      backgroundColor = "blue";
                      color = "white";
                      displayText = "Admin";
                      break;
                    case "ROLE_MODERATOR":
                      backgroundColor = "green";
                      color = "white";
                      displayText = "Moderator";
                      break;
                    case "ROLE_USER":
                      backgroundColor = "red";
                      color = "white";
                      displayText = "Kullanıcı";
                      break;
                    default:
                      backgroundColor = "gray";
                      displayText = "Unknown";
                  }
                  return (
                    <div
                      key={role.name}
                      style={{
                        width: "fit-content",
                        backgroundColor: backgroundColor,
                        color: color,
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      {displayText}
                    </div>
                  );
                })}
            </div>
          ),
          heading_2: (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "1em",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => deleteOneUser(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                  </svg>
                  &nbsp; Düzenle
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteOneUser(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                  &nbsp; Kullanıcıyı sil.
                </button>
              </motion.div>
            </div>
          ),
          // Assuming 'heading_2' is empty
          _cellProps: { id: { scope: "row" } },
        }));

        // Update the items state
        setItems(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); //

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        let errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users", { headers: authHeader() });
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once

  const deleteOneUser = async (userId) => {
    try {
      const response = await axios.delete(`/users/${userId}`, {
        headers: authHeader(),
      });
      // Filter out the deleted user from the users array
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <div>
          <h2 style={{ textAlign: "center" }}>Admin Paneli</h2>
          <CRow>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilUser} height={36} />}
                //progress={{ color: "primary", value: 75 }}
                text="Toplam Kullanıcı Sayısı"
                title="Toplam Kullanıcı Sayısı"
                value="5"
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilClipboard} height={36} />}
                //progress={{ color: "primary", value: 75 }}
                text="Toplam Atılan Post Sayısı"
                title="Toplam Atılan Post Sayısı"
                value="12"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilCommentSquare} height={36} />}
                //progress={{ color: "primary", value: 75 }}
                text="Toplam Yorum Sayısı"
                title="Toplam Yorum Sayısı"
                value="3"
              />
            </CCol>
            <CCol
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "2em",
              }}
              xs={6}
            >
              <h5>Üyelerin Rol Dağılım Oranı</h5>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
              />
            </CCol>
          </CRow>
          <CTable hover columns={columns} items={items} />{" "}
          {/*
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                Kullanıcı Adı: {user.username} ID: {user.id}
                &nbsp; &nbsp;
                <button onClick={() => deleteOneUser(user.id)}>
                  Kullanıcıyı sil.
                </button>
              </li>
            ))}
          </ul>
          
          
           */}
        </div>
      </header>
    </div>
  );
};

export default BoardAdmin;

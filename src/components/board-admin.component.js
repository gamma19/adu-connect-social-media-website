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
      label: " ",
      _props: { scope: "col" },
    },
    {
      key: "heading_2",
      label: " ",
      _props: { scope: "col" },
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
                class="btn btn-danger"
                onClick={() => deleteOneUser(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
                &nbsp; Kullanıcıyı sil.
              </button>
            </motion.div>
          ), // Assuming 'heading_1' is the ID
          heading_2: "", // Assuming 'heading_2' is empty
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
          <h2>Admin Paneli</h2>
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
              }}
              xs={6}
            >
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

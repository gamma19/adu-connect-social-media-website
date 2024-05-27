import React from "react";
import "./Announcement.css";
//import Header from "..components/header/Header";
//import Footer from "..components/footer/Footer";
import AnnouncementFragment from "../components/announcement-fragment/AnnouncementFragment";
import authHeader from "../services/auth-header";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { TextField } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);
  //const [user, setUser] = useState(null);
  const [user, setUser] = useState({ username: "" });
  const [admin, setAdmin] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setPostTitle] = useState("");
  const [icerik, setIcerik] = useState("");
  const [icerikError, setIcerikError] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAdmin = currentUser.roles.some((role) => role === "ROLE_ADMIN");
    setAdmin(isAdmin);
  }, [currentUser.roles]); // Depend on currentUser.roles to avoid unnecessary re-renders

  useEffect(() => {
    fetch("/posts", { headers: authHeader() })
      .then((res) => res.json())
      .then(
        (data) => {
          setAnnouncement(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
    setTitleError(e.target.value.trim() === "");
  };

  const handleIcerikChange = (e) => {
    setIcerik(e.target.value);
    setIcerikError(e.target.value.trim() === "");
  };

  const handleSubmit = (e) => {
    const postData = {
      title: title,
      icerik: icerik,
      userId: currentUser.id,
    };

    axios
      .post(`/posts`, postData, { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  console.log(admin);

  return (
    <>
      {admin && (
        <html>
          <head>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
              crossorigin="anonymous"
            ></link>
            <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></script>
            <title>
              ADU Connect-Üniversitemizin en popüler sosyal medya uygulaması.
            </title>
          </head>
          <body>
            <header></header>
            <div className="announcement-main">
              <div className="announcement-container">
                <form className="post-form" onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    id="outlined-multiline-static"
                    label="Başlığı Gir"
                    multiline
                    rows={1}
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                  {titleError && (
                    <div className="error-message" style={{ color: "red" }}>
                      Lütfen duyuru başlığını giriniz.
                    </div>
                  )}
                  <TextField
                    label="İçeriği Gir"
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    fullWidth
                    value={icerik}
                    onChange={handleIcerikChange}
                    required
                  />

                  {icerikError && (
                    <div className="error-message" style={{ color: "red" }}>
                      Lütfen duyuru içeriğini giriniz.
                    </div>
                  )}
                  <motion.div
                    whileHover={
                      !titleError && !icerikError ? { scale: 1.1 } : {}
                    }
                    whileTap={!titleError && !icerikError ? { scale: 0.9 } : {}}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className=""
                  >
                    <button
                      type="submit"
                      class="btn btn-primary"
                      disabled={titleError || icerikError}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-send-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                      </svg>
                      &nbsp; Duyuruyu Gönder
                    </button>
                  </motion.div>
                </form>
                {announcement
                  .slice()
                  .reverse()
                  .map((announcement) => (
                    <AnnouncementFragment
                      title={announcement.title}
                      icerik={announcement.icerik}
                    />
                  ))}
                {/*<AnnouncementFragment /> */}
                {/*<AnnouncementFragment /> */}
              </div>
            </div>
            <footer></footer>
          </body>
        </html>
      )}
    </>
  );
};

export default Announcement;

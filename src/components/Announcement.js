import React from "react";
import "./Announcement.css";
//import Header from "..components/header/Header";
//import Footer from "..components/footer/Footer";
import AnnouncementFragment from "../components/announcement-fragment/AnnouncementFragment";
import authHeader from "../services/auth-header";
import { useState, useEffect } from "react";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);

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

  return (
    <>
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
    </>
  );
};

export default Announcement;

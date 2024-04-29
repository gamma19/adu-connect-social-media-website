import React from "react";
import "./Announcement.css";
//import Header from "..components/header/Header";
//import Footer from "..components/footer/Footer";
import AnnouncementFragment from "../components/announcement-fragment/AnnouncementFragment";

const Announcement = () => {
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
              <AnnouncementFragment />
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

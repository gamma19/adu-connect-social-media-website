import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-container-top">
          <h2 className="footer-title" style={{ paddingRight: "5px" }}>
            © 2024 Utku Enes Baki
          </h2>
          <Link to="https://github.com/gamma19">
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: "#ffffff", paddingRight: "5px" }}
              size="2x"
            />
          </Link>
          <Link to="https://tr.linkedin.com/in/utku-enes-baki-35b6b5239">
            <FontAwesomeIcon
              icon={faLinkedin}
              style={{ color: "#ffffff" }}
              size="2x"
            />
          </Link>
          <h2
            className="footer-title"
            style={{ paddingLeft: "35px", paddingRight: "5px" }}
          >
            Salih Can Aydoğdu
          </h2>
          <Link to="https://github.com/Jsalih-aydogduJ">
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: "#ffffff" }}
              size="2x"
            />{" "}
          </Link>
        </div>

        {/*
        <div className="footer-container-middle">
          
        </div>
        */}

        {/*<div className="footer-container-bottom">
          <div className="left">
          
            <p>Bize Ulaş</p>
            <p>Hakkımızda</p>
          </div>
          <div className="right">
            <p>R</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Footer;

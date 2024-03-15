import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <div className="not-found-main">
        <div className="not-found-container">
          <div className="top">
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <a class="btn btn-primary btn-lg" role="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-diamond-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                    />
                  </svg>{" "}
                  &nbsp; Anasayfaya geri dön
                </a>
              </motion.div>
            </Link>
          </div>
          <div className="bottom">
            <img alt="" className="img" src={require("./favicon.ico")} />
            <h5 className="header">Bir hata oluştu!</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

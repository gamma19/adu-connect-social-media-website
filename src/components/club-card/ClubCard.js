import React from "react";
import "./ClubCard.css";
import MuiRating from "../../components/mui-rating/MuiRating";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ClubCard = () => {
  return (
    <>
      <div className="club-card-main">
        <div className="club-left">
          <div className="club-left-top"></div>
          <h5>Klüp İsmi</h5>
          <MuiRating />
        </div>
        <div className="club-right">
          <h5>Klüp İsmi</h5>
          <div className="club-right-main">Main</div>
          <div className="club-right-bottom">
            <h5>Klüpteki üye sayısı: 245</h5>
            <Link to="/about">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <button class="btn btn-primary btn-lg" role="button">
                  Klüpten Çık
                </button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubCard;

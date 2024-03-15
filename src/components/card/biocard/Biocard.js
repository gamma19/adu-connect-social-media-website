import React from "react";
import "./Biocard.css";
import { motion } from "framer-motion";

const Biocard = () => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="biocard"
      >
        <h5>Framer-Motion</h5>
      </motion.div>
    </>
  );
};

export default Biocard;

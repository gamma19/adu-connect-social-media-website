import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Comment.css";

const Comment = (props) => {
  const { id, userId, postId, commentIcerik, deleteComment } = props;

  return (
    <>
      <div className="comment">
        <ul>
          <h4 style={{ fontSize: "15px" }}>
            Post ID - {postId} &nbsp; &nbsp; Yorum ID - {id}
          </h4>
          <p style={{ fontSize: "15px" }}>{commentIcerik}</p>
        </ul>
        <div className="comment-bottom">
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
              class="btn btn-danger"
              onClick={deleteComment}
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
              &nbsp; Yorumu Sil
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Comment;

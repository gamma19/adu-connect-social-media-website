import React, { useState, useEffect } from "react";
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
          <button type="button" class="btn btn-danger" onClick={deleteComment}>
            Yorumu Sil
          </button>
        </div>
      </div>
    </>
  );
};

export default Comment;

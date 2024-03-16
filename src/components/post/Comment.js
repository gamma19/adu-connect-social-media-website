import React, { useState, useEffect } from "react";
import "./Comment.css";

const Comment = (props) => {
  const { id, userId, postId, commentIcerik } = props;

  return (
    <>
      <div className="comment">
        <ul>
          <h4 style={{ fontSize: "15px" }}>
            Post Id - {postId} = Yorum - {userId}
          </h4>
          <p style={{ fontSize: "15px" }}>{commentIcerik}</p>
        </ul>
      </div>
    </>
  );
};

export default Comment;

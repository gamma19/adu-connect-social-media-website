import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import AuthService from "../../services/auth.service";
import axios from "axios";
import authHeader from "../../services/auth-header";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField"; // Import TextField for input
import Button from "@mui/material/Button"; // Import Button for sending comments

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Post = (props) => {
  const [correctUser, setCorrectUser] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const {
    title,
    icerik,
    userId,
    Id,
    deletePost,
    username,
    likeId,
    handleLike,
    likes,
    comment,
    setComment,
    sendComment,
    val,
    handleSendComment,
    createdAt,
    likeCount,
    postImg,
    handleUpvote,
    handleDownvote,
    likeFunction,
    isProfile,
  } = props;

  useEffect(() => {
    function checkCorrectUser() {
      if (AuthService.getCurrentUser().id === userId) {
        setCorrectUser(true);
      }
    }
    checkCorrectUser();
  }, []);

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  return (
    <>
      <div className="post">
        <div className="post-upper">
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: "/profile" }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar
                alt=""
                src={postImg}
                sx={{ width: 70, height: 70, bgcolor: blue[600] }}
              ></Avatar>
            </Stack>
          </Link>
          &nbsp; &nbsp;
          <h5>{username}</h5>
          &nbsp; &nbsp;
          <h5>Post ID: {Id}</h5>
          &nbsp; &nbsp;
          <h5>User ID: {userId}</h5>
        </div>
        <div className="post-middle">
          <h5>{createdAt}</h5>
          <h4>{title}</h4>
          <p>{icerik}</p>
        </div>
        <div className="post-bottom">
          {isProfile ? null : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginLeft: "1em",
              }}
            >
              <h5
                style={{
                  color: "#154EA2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {likeCount}
              </h5>
              <button
                onClick={handleUpvote}
                style={{
                  backgroundColor: "#154EA2",
                  color: "white",
                  borderRadius: "5%",
                  marginBottom: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-arrow-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                  />
                </svg>
              </button>
              <button
                onClick={handleDownvote}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "5%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                  />
                </svg>
              </button>
              {/*
            <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                sx={{
                  fontSize: 35,
                  color: red[800],
                  "&.Mui-checked": {
                    color: red[600],
                    "& .MuiSvgIcon-root": { fontSize: 35 },
                  },
                }}
                onChange={handleLike}
              />
              
            
            
             */}
            </div>
          )}
          <div className="post-bottom-left">
            {/*
              <button
              type="button"
              class="btn btn-primary"
              onClick={handleLike}
              style={liked ? { backgroundColor: "red", color: "white" } : null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-hand-thumbs-up"
                viewBox="0 0 16 16"
              >
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.040-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
              </svg>
            </button>
 */}

            {/* 
            <button type="button" class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-share-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
              </svg>
              &nbsp; Paylaş
            </button>
            */}
          </div>
          <div className="post-bottom-right">
            {/*
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
                class="btn btn-warning"
                onClick={deletePost}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
                &nbsp; Düzenle
              </button>
            </motion.div>
          
          
           */}

            {correctUser ? (
              <motion.div
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={deletePost}
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
                </button>
              </motion.div>
            ) : null}
          </div>
        </div>
        <div className="comment-input">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className=""
          >
            <button
              type="submit"
              class="btn btn-primary"
              onClick={toggleCommentInput}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-chat-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
              </svg>
            </button>
          </motion.div>
          {showCommentInput && (
            <div className="comment-input-inside">
              <TextField
                size="medium"
                label="Yorumunu Yaz"
                variant="outlined"
                value={comment}
                onChange={handleSendComment}
                fullWidth
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={sendComment}
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
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;

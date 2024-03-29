import { React, useState, useEffect } from "react";
import "./SocialFlow.css";
//import Carousel from "../../components/carousel/Carousel";
import { Link, useParams } from "react-router-dom";
import DocumentMeta from "react-document-meta";
//import Header from "../../components/header/Header";
//import Footer from "../../components/footer/Footer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import MultilineTextFields from "../components/text-field/MultilineTextFields";
import Pagination from "@mui/material/Pagination";
import Accordion from "../components/accordion/Accordion";
import { motion } from "framer-motion";
import EmojiComponent from "../components/emoji-component/EmojiComponent";
import Post from "../components/post/Post";
import Comment from "../components/post/Comment";
import authHeader from "../services/auth-header";
import axios from "axios";
import NotFound from "./not-found/NotFound";

const SocialFlow = () => {
  const meta = {
    title: "ADU Connect",
    description: "ADU Connect",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "react, meta tags, seo",
      },
    },
  };

  const { userId, userName, postId, Id } = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [commentIsLoaded, setCommentIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/posts", { headers: authHeader() })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch("/comments", { headers: authHeader() })
      .then((res) => res.json())
      .then(
        (result) => {
          setCommentIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setCommentIsLoaded(true);
          setCommentError(error);
        }
      );
  }, []);

  const deletePost = (postId) => {
    axios
      .delete(`/posts/${postId}`, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        setPostList(postList.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`/comments/${commentId}`, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        setCommentList(
          commentList.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  //const userComments = commentList.filter(comment => comment.postId === comment.userId);

  if (error) {
    return (
      <div>
        <NotFound />
      </div>
    );
  } else if (!isLoaded) {
    return <div> Yükleniyor... </div>;
  } else {
    return (
      <>
        <DocumentMeta {...meta}>
          <html>
            <head>
              <meta
                name="viewport"
                content="width=device-width"
                initial-scale="1.00"
              />
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossorigin="anonymous"
              ></link>

              <link
                rel="canonical"
                href="https://getbootstrap.com/docs/4.0/examples/jumbotron/"
              />

              <link href="../../dist/css/bootstrap.min.css" rel="stylesheet" />

              <link href="jumbotron.css" rel="stylesheet" />
            </head>
            <body>
              <header></header>
              <div className="container-socialflow">
                <div className="mainframe">
                  <div className="left-mainframe">
                    <Link to="/">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ marginBottom: "10px" }}
                        className=""
                      >
                        <a class="btn btn-primary btn-lg" role="button">
                          Anasayfaya dönmek için tıkla
                        </a>
                      </motion.div>
                    </Link>
                    <Accordion />
                  </div>
                  <div className="mid-mainframe">
                    <div className="upper-mid">
                      <div className="text-input">
                        <TextField
                          id="outlined-multiline-static"
                          label="Şimdi Paylaş!"
                          multiline
                          rows={2}
                          fullWidth
                        />
                        <EmojiComponent />
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                          >
                            <ArrowForwardIosIcon />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <div className="main-mid">
                      <h5 style={{ textAlign: "center" }}>-- Ana Akış --</h5>

                      <ul>
                        {console.log("postList", postList)}
                        {postList.reverse().map((post) => (
                          <li key={post.id}>
                            <Post
                              Id={post.id}
                              userId={post.userId}
                              title={post.title}
                              icerik={post.icerik}
                              deletePost={() => deletePost(post.id)}
                            />
                            {commentList
                              .filter((comment) => comment.postId === post.id)
                              .map((comment) => (
                                <Comment
                                  id={comment.id}
                                  userId={comment.userId}
                                  postId={comment.postId}
                                  commentIcerik={comment.commentIcerik}
                                  deleteComment={() =>
                                    deleteComment(comment.id)
                                  }
                                />
                              ))}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="right-mainframe">
                    <div className="right-top"></div>
                    <div className="right-input">
                      <TextField
                        id="outlined-multiline-static"
                        label="Gönder"
                        multiline
                        rows={1}
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
                        <Button variant="contained" color="primary">
                          <ArrowForwardIosIcon />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        </DocumentMeta>
      </>
    );
  }
};

export default SocialFlow;

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
import AuthService from "../services/auth.service";
import Avatar from "@mui/material/Avatar";
import EmojiPicker from "emoji-picker-react";

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

  const { userId, userName, postId, Id, likes } = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [commentIsLoaded, setCommentIsLoaded] = useState(false);
  const [title, setPostTitle] = useState("");
  const [icerik, setIcerik] = useState("");

  // post'un time'ini cekme
  const [time, setTime] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [icerikError, setIcerikError] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState(""); // State for the comment input
  const [allLikes, setAllLikes] = useState([]);
  const [upvote, setUpvote] = useState();
  const [likeList, setLikeList] = useState({});

  // like counter added.
  const [likeCount, setLikeCount] = useState(0);

  //const [accordionVisible, setAccordionVisible] = useState(false);

  const handleSendComment = (e) => {
    setComment(e.target.value);
  };
  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
    setTitleError(e.target.value.trim() === "");
  };

  const handleIcerikChange = (e) => {
    setIcerik(e.target.value);
    setIcerikError(e.target.value.trim() === "");
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) {
        setRedirect("/home");
        return;
      }

      setCurrentUser(currentUser);
      setUserReady(true);
    };

    fetchData();
  }, []);

  const getLike = (postId) => {
    axios
      .get(`/likes/posts/${postId}/count`, { headers: authHeader() })
      .then((res) => {
        setLikeCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts", { headers: authHeader() });
        const posts = res.data;
        setPostList(posts);
        setIsLoaded(true);

        // Fetch like counts for each post
        posts.forEach((post) => {
          handleLikeCount(post.id);
        });
      } catch (error) {
        setError(error);
        setIsLoaded(true);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    fetch("/likes", { headers: authHeader() })
      .then((res) => res.json())
      .then(
        (result) => {
          setAllLikes(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  {
    /*

useEffect(() => {
    fetch(`/likes/posts/${postId}/count`, { headers: authHeader() })
      .then((res) => res.json())
      .then(
        (result) => {
          setLikeCount(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

*/
  }

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

  const sendComment = (postId) => {
    const commentData = {
      userId: currentUser.id,
      postId: postId, // Assuming you have the post ID
      commentIcerik: comment,
    };
    axios
      .post(`/comments`, commentData, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error sending comment:", error);
      });
  };

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

  const handleUpvote = (postId) => {
    const postLike = {
      postId: postId,
      userId: currentUser.id,
    };
    axios
      .post(`/likes`, postLike, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  const handleLikeCount = (postId) => {
    axios
      .get(`/likes/posts/${postId}/count`, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        setLikeList((prevLikeList) => ({
          ...prevLikeList,
          [postId]: res.data.likeCount, // Ensure likeCount is a number
        }));
      })
      .catch((error) => {
        console.error("Error fetching like count:", error);
      });
  };

  const handleDownvote = (postId, userId) => {
    axios
      .delete(`/likes/user/${userId}/post/${postId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error unliking post:", error);
      });
  };

  const handleLike = (postId, likeId) => {
    const postLike = {
      postId: postId,
      userId: currentUser.id,
    };

    if (liked) {
      axios
        .delete(`/likes/${likeId}`, { headers: authHeader() })
        .then((res) => {
          console.log(res.data);
          setLiked(false);
        })
        .catch((error) => {
          console.error("Error unliking post:", error);
        });
    } else {
      axios
        .post(`/likes`, postLike, { headers: authHeader() })
        .then((res) => {
          console.log(res.data);
          setLiked(true);
        })
        .catch((error) => {
          console.error("Error liking post:", error);
        });
    }
  };

  const handleSubmit = (e) => {
    const postData = {
      title: title,
      icerik: icerik,
      userId: currentUser.id,
    };

    axios
      .post(`/posts`, postData, { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  useEffect(() => {
    console.log("Updated likeList:", likeList);
  }, [likeList]);

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
                    <ul>
                      <li>
                        <Avatar
                          sx={{ m: 1, bgcolor: "#0B5ED7", color: "white" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-diamond-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                            />
                          </svg>{" "}
                        </Avatar>
                        <p>
                          Lütfen görgü kurallarına uygun bir biçimde post
                          atınız.
                        </p>
                      </li>
                      <li>
                        <Avatar
                          sx={{ m: 1, bgcolor: "#0B5ED7", color: "white" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-diamond-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                            />
                          </svg>{" "}
                        </Avatar>
                        <p>
                          Postlarınızda her zaman saygılı bir dil kullanmaya
                          özen gösterin. Diğer kullanıcılara karşı kibar ve
                          anlayışlı olun, tartışmaları yapıcı bir şekilde
                          yönlendirin.
                        </p>
                      </li>
                      <li>
                        <Avatar
                          sx={{ m: 1, bgcolor: "#0B5ED7", color: "white" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-diamond-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                            />
                          </svg>{" "}
                        </Avatar>
                        <p>
                          Moderatörler, platformdaki uygunluk standartlarına
                          uymayan içerikleri tespit edip kaldırmakla sorumludur.
                          Bu yüzden postlarınızın içerikleri moderasyon
                          tarafından kontrol edilmektedir.
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="mid-mainframe">
                    <div className="upper-mid">
                      <form className="post-form" onSubmit={handleSubmit}>
                        <TextField
                          type="text"
                          id="outlined-multiline-static"
                          label="Başlığı Gir"
                          multiline
                          rows={1}
                          fullWidth
                          value={title}
                          onChange={handleTitleChange}
                          required
                        />

                        {titleError && (
                          <div
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            Lütfen post başlığını giriniz.
                          </div>
                        )}
                        <TextField
                          label="İçeriği Gir"
                          id="outlined-multiline-static"
                          multiline
                          rows={1}
                          fullWidth
                          value={icerik}
                          onChange={handleIcerikChange}
                          required
                        />
                        {icerikError && (
                          <div
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            Lütfen post içeriğini giriniz.
                          </div>
                        )}
                        <motion.div
                          whileHover={
                            !titleError && !icerikError ? { scale: 1.1 } : {}
                          }
                          whileTap={
                            !titleError && !icerikError ? { scale: 0.9 } : {}
                          }
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className=""
                        >
                          <button
                            type="submit"
                            class="btn btn-primary"
                            disabled={titleError || icerikError}
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
                            &nbsp; Postu Gönder
                          </button>
                        </motion.div>
                      </form>
                    </div>
                    <div className="main-mid">
                      {/*
                  
                                          <EmojiPicker open="false" />

                    
                     */}

                      <ul>
                        {console.log("postList", postList)}
                        {postList
                          .slice()
                          .reverse()
                          .map((post) => (
                            <li key={post.id}>
                              <Post
                                Id={post.id}
                                userId={post.userId}
                                createdAt={post.createdAt}
                                title={post.title}
                                icerik={post.icerik}
                                username={post.userName}
                                postImg={post.profile_picture}
                                // getting like count, in order to understand which post like will be fetched.
                                // we can test it via getLike button and show that (that button will be on every post - update post component)
                                //likeCount={likeCount}
                                //////////////////////////////////////////////////////////////////////////////
                                deletePost={() => deletePost(post.id)}
                                //////////////////////////////////////////////////////////////////////////////
                                // problem is on handlelike()
                                //likeFunction={() => handleLikeCount(post.id)}
                                likeCount={likeList[post.id] || 0} // Ensure this is a number
                                handleUpvote={() => handleUpvote(post.id)}
                                handleDownvote={() =>
                                  handleDownvote(post.id, currentUser.id)
                                }
                                comment={comment}
                                handleSendComment={handleSendComment}
                                sendComment={() => sendComment(post.id)}
                              />
                              {commentList
                                .filter((comment) => comment.postId === post.id)
                                .map((comment) => (
                                  <Comment
                                    id={comment.id}
                                    createdAt={comment.createdAt}
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
                  {/* 
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
                  
                  
                  */}
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

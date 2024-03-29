import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import AuthService from "../services/auth.service";
import Post from "../components/post/Post";
import Comment from "../components/post/Comment";
import "./Users.css";
//import usePosts from "../services/usePosts";
import authHeader from "../services/auth-header";
import axios from "axios";
import BasicForm from "./forms/BasicForm";
import { motion } from "framer-motion";
import NotFound from "./not-found/NotFound";

const Profile = () => {
  const { userId } = useParams();
  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [commentList, setCommentList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [commentIsLoaded, setCommentIsLoaded] = useState(false);

  const [title, setPostTitle] = useState("");
  const [icerik, setIcerik] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [icerikError, setIcerikError] = useState(false);

  //const [editing, setEditing] = useState(false);
  const [editPost, setEditPost] = useState({
    title: "",
    icerik: "",
    userId: "",
  });

  const handleEdit = () => {
    //setEditing(true);
    setEditPost({ title, icerik, userId });
  };

  const handleEditSubmit = (postId) => {
    postId.preventDefault();
    // Send a request to the backend to update the post
    // After successful update, update the post in the frontend state
    // and set editing to false
    const postData = {
      title: title,
      icerik: icerik,
    };

    axios
      .put(`/posts/${postId}`, postData, { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
        // After successful update, update the post in the frontend state
        // and set editing to false

        //updatePost(response.data); // Assuming updatePost is a function passed down from the parent component
        //setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Handle the error, e.g., show an error message to the user
      });

    setPostList(postList.filter((post) => post.id !== postId));
  };

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
    setTitleError(e.target.value.trim() === "");
  };

  const handleIcerikChange = (e) => {
    setIcerik(e.target.value);
    setIcerikError(e.target.value.trim() === "");
  };

  //const { posts } = usePosts();

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

  //const addPost =

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

  // client side user specific post filtering.
  const userPosts = postList.filter((post) => post.userId === currentUser.id);

  if (error) {
    return <NotFound />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!userReady) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="profile-main">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-left-top">
            <img
              className="profile-img"
              src={require("../assets/default-avatar.jpg")}
              alt=""
            ></img>
          </div>
          <div className="profile-left-bottom">
            <div className="info">
              <p>
                <strong>Username: </strong>
                {currentUser.username}
              </p>
              <p>
                <strong>Email: </strong>
                {currentUser.email}
              </p>
              <p>
                <strong>ID: </strong>
                {currentUser.id}
              </p>
              <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(
                  currentUser.accessToken.length - 20
                )}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <li style={{ color: "white" }} key={index}>
                      {role}
                    </li>
                  ))}
              </ul>
            </div>
            <p>
              Share icon John Doe is a versatile individual with a diverse range
              of interests and talents. Born and raised in a small town, John
              developed a passion for music at a young age. He spent countless
              hours honing his skills as a guitarist and eventually formed a
              successful band that toured internationally.
            </p>
            <h4 style={{ fontSize: "30px" }}>
              - - - - Kaydolunan Klüpler - - - -
            </h4>
            <ol>
              <li>Satranç Klübü</li>
              <li>Tenis Klübü</li>
              <div className="links">
                <ul style={{ listStyle: "none" }}>
                  <h3>Sosyal Medya Linkleri</h3>
                  <li>
                    <Link to="">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        style={{ color: "#0A66C2" }}
                        size="2x"
                      />
                    </Link>
                    &nbsp; Linkedin
                  </li>
                  <li>
                    <Link to="">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ color: "#E1306C" }}
                        size="2x"
                      />
                    </Link>
                    &nbsp; Instagram
                  </li>
                  <li>
                    <Link to="">
                      <FontAwesomeIcon
                        icon={faGithub}
                        style={{ color: "black", paddingRight: "5px" }}
                        size="2x"
                      />
                    </Link>
                    Github
                  </li>
                  <li>
                    <Link to="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        width="28"
                        viewBox="0 0 512 512"
                      >
                        <path
                          opacity="1"
                          fill="#1E3050"
                          d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                        />
                      </svg>
                    </Link>
                    &nbsp; X
                  </li>
                </ul>
              </div>
            </ol>
          </div>
        </div>
        <div className="profile-right">
          <div className="banner">
            <img
              className="banner-img"
              src={require("./adu1.jpg")}
              alt="Bannerınız"
            />
          </div>

          {/*
          <form className="post-form" onSubmit={handleSubmit}>
            <label>Post Formu</label>
            <input
              type="text"
              placeholder="Başlığı Gir"
              value={title}
              onChange={handleTitleChange}
              required
            />
            {titleError && (
              <div className="error-message" style={{ color: "red" }}>
                Lütfen post başlığını giriniz.
              </div>
            )}
            <input
              type="text"
              placeholder="İçeriği Gir"
              value={icerik}
              onChange={handleIcerikChange}
              required
            />
            {icerikError && (
              <div className="error-message" style={{ color: "red" }}>
                Lütfen post içeriğini giriniz.
              </div>
            )}
            <motion.div
              whileHover={!titleError && !icerikError ? { scale: 1.1 } : {}}
              whileTap={!titleError && !icerikError ? { scale: 0.9 } : {}}
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
          
           */}

          <div className="profile-right-bottom">
            <h5 style={{ textAlign: "center" }}>
              -- &nbsp; Attığınız Postlar &nbsp; --
            </h5>
            <ul style={{ listStyleType: "none" }}>
              {userPosts
                .slice()
                .reverse()
                .map((post) => (
                  <li key={post.id}>
                    <Post
                      Id={post.id}
                      userId={post.userId}
                      title={post.title}
                      icerik={post.icerik}
                      username={currentUser.username}
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
                          deleteComment={() => deleteComment(comment.id)}
                        />
                      ))}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

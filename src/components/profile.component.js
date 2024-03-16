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

const Profile = () => {
  const { userId, title } = useParams();
  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) {
        setRedirect("/home");
        return;
      }

      setCurrentUser(currentUser);
      setUserReady(true);

      try {
        const postResponse = await fetch("/posts");
        if (!postResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postData = await postResponse.json();
        setPostList(postData);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
        setIsLoaded(true);
      }

      try {
        const commentResponse = await fetch("/comments");
        if (!commentResponse.ok) {
          throw new Error("Failed to fetch comments");
        }
        const commentData = await commentResponse.json();
        setCommentList(commentData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!userReady || !isLoaded) {
    return <div>Loading...</div>;
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
            <h4>Username: {currentUser.username}</h4>
            <h4>Email: {currentUser.email}</h4>
            <h4>ID: {currentUser.id}</h4>
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
          <div className="info">
            <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
              ...{" "}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </p>
            <p></p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
          <div className="profile-right-bottom">
            <ul>
              {postList.map((post) => (
                <li key={post.Id}>
                  <Post
                    userId={post.userId}
                    title={post.title}
                    icerik={post.icerik}
                  />
                  {commentList
                    .filter((comment) => comment.postId === post.Id)
                    .map((comment) => (
                      <Comment
                        key={comment.Id}
                        userId={comment.userId}
                        postId={comment.postId}
                        commentIcerik={comment.commentIcerik}
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

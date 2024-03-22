import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL + "posts", {
          headers: authHeader(),
        });
        setPosts(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPosts();
  }, []);

  return { posts, error };
};

export default usePosts;

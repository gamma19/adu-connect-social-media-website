import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "./auth-header";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts`, { headers: authHeader() });
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  return { posts, error };
};

export default usePosts;

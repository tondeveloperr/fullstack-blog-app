import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/posts${category}`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.image} alt="img" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.description}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

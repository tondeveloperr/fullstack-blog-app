import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import "./menu.scss";
import { useNavigate } from "react-router-dom";

const Menu = ({ category }) => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category) {
          // Memastikan category ada sebelum permintaan API
          const response = await axiosInstance.get(
            `/posts/?category=${category}`
          );
          setPosts(response.data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchData();
  }, [category]);

  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="menu">
      <h1>Other posts you may like:</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.image}`} alt="img" />
          <div className="wrapper">
            <h2>{post.title}</h2>
            <button onClick={() => navigateToPost(post.id)}>Read More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

Menu.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Menu;

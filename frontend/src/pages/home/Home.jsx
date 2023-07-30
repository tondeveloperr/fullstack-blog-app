import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import "./home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postLoaded, setPostLoaded] = useState(false);

  const category = useLocation().search;
  const navigate = useNavigate(); // Step 1: Dapatkan fungsi navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/posts${category}`);
        setPosts(response.data);
        setPostLoaded(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Jika terjadi 404 Not Found, arahkan pengguna ke halaman "Page Not Found"
          navigate("/page-not-found");
        } else {
          console.log(error.response?.data?.message);
        }
      }
    };
    fetchData();
  }, [category, navigate]);

  // Step 2: Tambahkan logika untuk memeriksa kategori yang valid
  const isValidCategory = (category) => {
    const validCategories = [
      "technology",
      "health",
      "travel",
      "fashion",
      "arts",
    ];
    return validCategories.includes(category.replace("?category=", ""));
  };

  // Step 3: Periksa apakah kategori valid dan lakukan pengalihan jika tidak
  useEffect(() => {
    if (category && !isValidCategory(category)) {
      navigate("/page-not-found");
    }
  }, [category, navigate]);

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.body.textContent;
  };

  if (!postLoaded) {
    return (
      <h4
        style={{
          fontSize: "24px",
          color: "#2a353d",
          marginTop: "80px",
          marginLeft: "20px",
          fontWeight: "lighter",
        }}
      >
        Loading...
      </h4>
    );
  }

  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.image}`} alt="img" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <div className="description">
                <p>{getText(post.description)}</p>
              </div>
              <button onClick={() => navigateToPost(post.id)}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

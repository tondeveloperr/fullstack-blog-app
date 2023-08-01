import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import {
  IconAvatarDefault,
  IconDelete,
  IconDeleteActive,
  IconEdit,
  IconEditActive,
} from "../../assets/icons";
import moment from "moment";
import { Menu } from "../../components/molecules";
import "./single.scss";

const Single = () => {
  const [post, setPost] = useState([]);
  const [isIconEditHovered, setIsIconEditHovered] = useState(false);
  const [isIconDeleteHovered, setIconDeleteHovered] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/post/${postId}`);
        setPost(response.data);
        setPostLoaded(true);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          navigate("/page-not-found");
        }
      }
    };
    fetchData();
  }, [postId, navigate]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/post/${postId}`);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleIconEditHover = (isHovered) => {
    setIsIconEditHovered(isHovered);
  };
  const handleIconDeleteHover = (isHovered) => {
    setIconDeleteHovered(isHovered);
  };

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.body.textContent;
  };

  // Periksa apakah post berhasil diambil, jika tidak, arahkan pengguna ke halaman "Page Not Found"
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

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="img" />
        <div className="user">
          {currentUser?.image ? (
            <img
              src={`../upload/${currentUser?.image}`}
              alt="user"
              className="profile-single"
            />
          ) : (
            <img
              src={IconAvatarDefault}
              alt="user"
              className="profile-single"
            />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link
                className="icon"
                to={`/write?edit=${post.id}`}
                state={post}
                onMouseEnter={() => handleIconEditHover(true)}
                onMouseLeave={() => handleIconEditHover(false)}
              >
                <img
                  src={isIconEditHovered ? IconEditActive : IconEdit}
                  alt="icon-edit"
                />
              </Link>
              <Link
                to="/"
                className="icon"
                onMouseEnter={() => handleIconDeleteHover(true)}
                onMouseLeave={() => handleIconDeleteHover(false)}
              >
                <img
                  onClick={handleDelete}
                  src={isIconDeleteHovered ? IconDeleteActive : IconDelete}
                  alt="icon-delete"
                />
              </Link>
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p>{getText(post.description)}</p>
      </div>
      <Menu category={post.category} />
    </div>
  );
};

export default Single;

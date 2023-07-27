import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconAvatarDefault,
  IconDelete,
  IconEdit,
} from "../../assets/icons/page";
import Menu from "../../components/menu/Menu";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./single.scss";

const Single = () => {
  const [post, setPost] = useState([]);
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
  }, [postId]);

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

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.body.textContent;
  };

  // Periksa apakah post berhasil diambil, jika tidak, arahkan pengguna ke halaman "Page Not Found"
  if (!postLoaded) {
    return (
      <h2 style={{ fontSize: "24px", color: "teal", marginTop: "20px" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="img" />
        <div className="user">
          <img src={post.userImage || IconAvatarDefault} alt="img" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={IconEdit} alt="icon-edit" />
              </Link>
              <img onClick={handleDelete} src={IconDelete} alt="icon-delete" />
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

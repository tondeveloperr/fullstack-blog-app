import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconAvatarDefault, IconDelete, IconEdit } from "../assets/icons/page";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
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

  return (
    <div className="single">
      <div className="content">
        <img src={post?.image} alt="img" />
        <div className="user">
          <img src={post.userImage || IconAvatarDefault} alt="img" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit/2`}>
                <img src={IconEdit} alt="icon-edit" />
              </Link>
              <img onClick={handleDelete} src={IconDelete} alt="icon-delete" />
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;

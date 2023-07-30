import { useContext, useEffect, useState } from "react";
import { IconAvatarDefault } from "../../assets/icons";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { ModalEditProfile } from "../../components/atoms";
import "./profile.scss";
import { Page404 } from "../../components/molecules";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { username } = useParams();
  const [isValidUsername, setIsValidUsername] = useState(true);

  useEffect(() => {
    const isValid = username === currentUser?.username;
    setIsValidUsername(isValid);

    if (!isValid) {
      navigate("/page-not-found");
    } else {
      // Buat fungsi untuk mengambil data postingan berdasarkan `uid` current user
      const fetchPosts = async () => {
        try {
          const response = await axiosInstance.get(
            `/userPosts?uid=${currentUser?.id}`
          );
          setUserPosts(response.data);
        } catch (error) {
          if (error.response) {
            setErrMessage(error.response?.data?.message);
          }
        }
      };

      fetchPosts();
    }
  }, [currentUser?.id, currentUser?.username, navigate, username]);

  if (!isValidUsername) {
    return <Page404 />;
  }

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.body.textContent;
  };

  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      await axiosInstance.put(`/user/${currentUser?.id}`, updatedData);
      setCurrentUser((prevUser) => ({ ...prevUser, ...updatedData }));
      closeModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container-profile">
      <div className="background">
        <div className="wrapper">
          <div className="profile-user">
            {currentUser?.image ? (
              <img src={`../upload/${currentUser?.image}`} alt="Profile" />
            ) : (
              <img src={IconAvatarDefault} alt="Profile" />
            )}
          </div>
          <div className="profile-info">
            <div>
              <h2>{currentUser?.username}</h2>
              <p>{currentUser?.email}</p>
            </div>
            <button onClick={openModal}>Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="box-list">
        <div className="list-post">
          <h2 className="label">Your Posts:</h2>
          {userPosts.length === 0 ? (
            <p className="no-post">{errMessage}</p>
          ) : (
            userPosts.map((post) => (
              <div className="post" key={post.id}>
                <img src={`../upload/${post.image}`} alt="img" />
                <div className="wrapper">
                  <h2 onClick={() => navigateToPost(post.id)}>{post.title}</h2>
                  <p>{getText(post.description)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {isModalOpen && (
        <ModalEditProfile
          onClose={closeModal}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default Profile;

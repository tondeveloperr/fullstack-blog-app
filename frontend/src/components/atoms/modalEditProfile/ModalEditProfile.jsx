import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../utils/axiosConfig";
import PropTypes from "prop-types";
import "./modaleditprofile.scss";

const ModalEditProfile = ({ onClose, onUpdateProfile }) => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    image: null, // Simpan file gambar yang akan diunggah
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is a file input (for image), handle it separately
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: e.target.files[0], // Simpan file gambar yang akan diunggah
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = currentUser.image; // Default image URL, in case no new image is uploaded

    if (formData.image) {
      // Jika ada gambar yang diunggah, upload gambar dan dapatkan URL gambar baru
      imageUrl = await uploadImage(formData.image);

      // Pastikan Anda memeriksa apakah imageUrl ada sebelum memperbarui formData
      if (imageUrl) {
        // Update data profil pengguna dengan URL gambar baru
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: imageUrl, // Set URL gambar baru
        }));
      }
    }

    // Update data profil pengguna dengan URL gambar baru
    const updatedData = { ...formData, image: imageUrl };
    onUpdateProfile(updatedData);
    onClose();
  };

  const uploadImage = async (imageFile) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", imageFile);

      const response = await axiosInstance.post("/upload", formDataToSend);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Error uploading image:", error);
      return null;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Profile Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="input-field"
            />
            {/* Add preview image here if needed */}
          </div>
          {/* Add other fields that can be edited here */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalEditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};
export default ModalEditProfile;

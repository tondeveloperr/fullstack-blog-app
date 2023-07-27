import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../utils/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "./write.scss";

const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    // Cek apakah ada gambar baru yang diupload
    if (file) {
      imageUrl = await upload();
    } else {
      // Jika tidak ada gambar baru, gunakan gambar yang sudah ada di post
      imageUrl = state?.image || "";
    }

    try {
      state
        ? await axiosInstance.put(`/post/${state.id}`, {
            title,
            description: description,
            category,
            image: imageUrl,
          })
        : await axiosInstance.post(`/post/`, {
            title,
            description: description,
            category,
            image: imageUrl,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={description}
            onChange={setDescription}
          />
          ;
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <div>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
          </div>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              checked={category === "technology"}
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              checked={category === "health"}
              type="radio"
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="health">Health</label>
          </div>

          <div className="cat">
            <input
              checked={category === "travel"}
              type="radio"
              name="cat"
              value="travel"
              id="travel"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="travel">Travel</label>
          </div>
          <div className="cat">
            <input
              checked={category === "fashion"}
              type="radio"
              name="cat"
              value="fashion"
              id="fashion"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="fashion">Fashion</label>
          </div>
          <div className="cat">
            <input
              checked={category === "arts"}
              type="radio"
              name="cat"
              value="arts"
              id="arts"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="arts">Arts</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

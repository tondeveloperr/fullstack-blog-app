import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const category = req.query.category;

  const selectQuery = category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(selectQuery, [category], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const selectQuery =
    "SELECT `username`,`title`,`description`,`category`, p.image, u.image AS userImage, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id =?";

  db.query(selectQuery, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(data[0] || {});
  });
};

export const addPost = (req, res) => {
  res.json("from controller post...");
};
export const updatePost = (req, res) => {
  res.json("from controller post...");
};
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "Not authentication" });

  jwt.verify(token, "jwt_key", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const postId = req.params.id;
    const deleteQuery = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(deleteQuery, [postId, userInfo.id], (err, data) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "You can delete only your post!" });
      }

      return res.status(200).json({ message: "Post has been deleted!" });
    });
  });
};

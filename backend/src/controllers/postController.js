import { db } from "../utils/db.js";

export const getPosts = (req, res) => {
  const category = req.query.category;

  const query = category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(query, [category], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  res.json("from controller post...");
};
export const addPost = (req, res) => {
  res.json("from controller post...");
};
export const updatePost = (req, res) => {
  res.json("from controller post...");
};
export const deletePost = (req, res) => {
  res.json("from controller post...");
};

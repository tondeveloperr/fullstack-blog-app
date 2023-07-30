import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/userPosts", getUserPosts);
router.post("/post", addPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;

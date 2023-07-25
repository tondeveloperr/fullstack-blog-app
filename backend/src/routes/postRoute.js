import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts", addPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;

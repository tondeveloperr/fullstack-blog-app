import express from "express";
import { addPost } from "../controllers/postController.js";

const router = express.Router();

router.get("/posts", addPost);

export default router;

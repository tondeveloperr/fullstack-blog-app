import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, "jwt_key", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    const postId = req.params.id;

    const updateQuery =
      "UPDATE users SET `username`=?, `email`=?, `image`=? WHERE `id` = ?";

    const values = [req.body.username, req.body.email, req.body.image];

    db.query(updateQuery, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      return res.status(200).json({ message: "User profile has been updated" });
    });
  });
};

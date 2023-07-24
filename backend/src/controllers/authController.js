import { db } from "../../db.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
  //cek pengguna
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) {
      return res.status(409).json("User already exists!");
    } else {
      //Hash password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json(err);

        // Simpan pengguna baru ke dalam database
        const insertQuery =
          "INSERT INTO users(`username`,`email`,`password`) VALUE (?)";

        const values = [req.body.username, req.body.email, hash];

        db.query(insertQuery, [values], (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json("User successfully registered!");
        });
      });
    }
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};

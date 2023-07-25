import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Cek pengguna
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (data.length) {
      return res.status(409).json({ message: "User already exists!" });
    } else {
      // Hash password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
          return res.status(500).json({ error: "Internal Server Error" });

        // Simpan pengguna baru ke dalam database
        const insertQuery =
          "INSERT INTO users(`username`, `email`, `password`) VALUES (?, ?, ?)";

        const values = [req.body.username, req.body.email, hash];

        db.query(insertQuery, values, (err, data) => {
          if (err)
            return res.status(500).json({ error: "Internal Server Error" });
          return res
            .status(200)
            .json({ message: "User successfully registered!" });
        });
      });
    }
  });
};

export const login = (req, res) => {
  //cek user
  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (data.length === 0) {
      // Jika user tidak ditemukan
      return res.status(404).json({ message: "User not found" });
    }

    // Memeriksa kecocokan password yang diinput dengan password di database
    bcrypt.compare(req.body.password, data[0].password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!result) {
        // Jika password tidak cocok
        return res.status(400).json({ message: "Wrong username or password" });
      }

      // Jika login berhasil, buat token JWT
      const token = jwt.sign(
        {
          id: data[0].id,
        },
        "secret_key"
      );

      const { password, ...other } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  });
};

export const logout = (req, res) => {};

import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import postRoute from "./src/routes/postRoute.js";
import { db } from "./db.js";

const port = process.env.APP_PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

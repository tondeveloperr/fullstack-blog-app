import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import corsOptions from "./utils/corsOptions.js";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

const port = process.env.APP_PORT || 5000;

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

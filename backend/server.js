import express from "express";
import dotenv from "dotenv";

const port = process.env.APP_PORT;

const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

import express from "express";
import dotenv from "dotenv";
// dotenv.config(); // I get error??????

const app = express();

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

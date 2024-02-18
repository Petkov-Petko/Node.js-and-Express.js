import express from "express";
import dotenv from "dotenv";
// dotenv.config(); // I get error??????
import myRouter from "./routes/contactRoutes.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/contacts", myRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

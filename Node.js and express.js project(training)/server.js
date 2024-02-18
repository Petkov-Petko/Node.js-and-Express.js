import express from "express";
import dotenv from "dotenv";
// dotenv.config(); // I get error??????
import myRouter from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";


const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts", myRouter);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

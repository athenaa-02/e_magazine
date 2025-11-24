import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToDatabase from "../config/database.js";
import articleRouter from "./routes/article-routes.js";
import userRouter from "./routes/user-router.js";

connectToDatabase();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4444;
app.use("/images", express.static("public/images"));

app.use("/api", articleRouter);
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

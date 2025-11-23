import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectToDatabase from "../config/database.js";
import articleRouter from "../routes/article-routes.js";
import userRouter from "../routes/user-router.js";

dotenv.config();

connectToDatabase();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4444;

app.use("/api", articleRouter);
app.use("/api", userRouter);

app.listen(PORT);

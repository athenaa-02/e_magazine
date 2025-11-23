import express from "express";
import { CreateArticle, getAllArticles } from "../controllers/article-controllers.js";

const articleRouter = express.Router();


articleRouter.get("/articles", getAllArticles);

articleRouter.post("/articles", CreateArticle);

export default articleRouter;

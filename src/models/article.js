import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
});

const Article = model("Article", articleSchema);
export default Article;

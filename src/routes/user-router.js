import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user-controllers.js";
import { createMulterImageConfigs } from "../helpers/multer-config.js";

const userRouter = express.Router();

const upload = createMulterImageConfigs("public/images");
userRouter.get("/users", getAllUsers);
userRouter.post("/users", upload.single("avatar"), createUser);

userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUser);
userRouter.post("/login", loginUser);

export default userRouter;

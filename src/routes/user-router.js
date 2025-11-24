import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);

userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id",authMiddleware, deleteUser);
userRouter.post('/login', loginUser)

export default userRouter;

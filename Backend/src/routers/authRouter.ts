import express from "express";
import {
  signup,
  signin,
  getMe,
  logout,
  deleteAccount,
} from "../controllers/authController";
import { protectMiddleware } from "../middlewares/protectMiddleware";
const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", protectMiddleware, logout);

router.get("/getMe", protectMiddleware, getMe);

router.post("/deleteAccount", protectMiddleware, deleteAccount);

export default router;

import express from "express";
import { signup, signin, getMe, logout } from "../controllers/authController";
const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", logout);

router.get("/getMe", getMe);

export default router;

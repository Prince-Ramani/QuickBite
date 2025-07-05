import express from "express";

const router = express.Router();

import { protectMiddleware } from "../middlewares/protectMiddleware";
import { switchAccount } from "../controllers/shopAuthControllers";

// router.post("/switchAccount", protectMiddleware, switchAccount);

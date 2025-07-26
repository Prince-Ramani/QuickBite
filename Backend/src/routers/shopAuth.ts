import express from "express";

const router = express.Router();

import { protectMiddleware } from "../middlewares/protectMiddleware";
import { switchAccount } from "../controllers/shopAuthControllers";
import { upload } from "../cloudinary/cloudinary";

router.post(
  "/switchAccount",
  protectMiddleware,
  upload.fields([{ name: "shopImages", maxCount: 4 }]),
  switchAccount,
);

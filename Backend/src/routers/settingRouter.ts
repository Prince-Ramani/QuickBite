import { Router } from "express";
import { protectMiddleware } from "../middlewares/protectMiddleware";
import { updateProfile } from "../controllers/settingsControllers";
import { upload } from "../cloudinary/cloudinary";

const router = Router();

router.put(
  "/updateProfile",
  protectMiddleware,
  upload.single("profilePicture"),
  updateProfile,
);

export default router;

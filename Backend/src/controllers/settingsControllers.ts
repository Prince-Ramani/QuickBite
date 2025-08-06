import { Request, Response } from "express";
import { UnderscoreEscapedMap } from "typescript";
import { uploadSingleToCloudinary } from "../services/uploadToClodinary";
import User from "../models/userModel";
import { isValidObjectId } from "mongoose";

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      profilePicture,
      username,
    }: {
      profilePicture: string | undefined;
      username: string | undefined;
    } = req.body;

    const userID = req.user;

    if (!req.user || !isValidObjectId(userID)) {
      res.status(400).json({ error: "Unauthorized." });
    }

    if (
      !username ||
      username.trim().length < 3 ||
      username.trim().length > 12
    ) {
      res
        .status(400)
        .json({ error: "A username must be between 3 to 12 characters!" });
      return;
    }

    const file = req.file;
    let pp: string | undefined = undefined;
    if (req.file) {
      const upr = await uploadSingleToCloudinary(req.file, "profile-pictures");
      if (upr.failedToUpload) {
        res.status(400).json({
          error: "Failed to upload profile picture!",
        });
        return;
      }
      pp = upr.result;
    }

    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({ error: "No such user found!" });
      return;
    }

    if (pp) {
      user.profilePicture = pp;
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: "Profile updated." });
    return;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error occurred in updateProfile controller:", err.message);
      console.error("Stack trace:", err.stack);
    } else {
      console.error("Unknown error occurred in updateProfile controller:", err);
    }
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

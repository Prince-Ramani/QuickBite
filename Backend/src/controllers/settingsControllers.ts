import { Request, Response } from "express";
import { UnderscoreEscapedMap } from "typescript";
import {
  deleteSingleFromCouldinary,
  uploadSingleToCloudinary,
} from "../services/uploadToClodinary";
import User from "../models/userModel";
import { isValidObjectId } from "mongoose";

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      username,
      removeProfilePicture,
    }: {
      username: string | undefined;
      removeProfilePicture?: string | undefined;
    } = req.body;

    const userID = req.user;

    if (!req.user || !isValidObjectId(userID)) {
      res.status(400).json({ error: "Unauthorized." });
      return;
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

    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({ error: "No such user found!" });
      return;
    }

    const file = req.file;
    let pp: string | undefined = undefined;

    if (req.file) {
      const upr = await uploadSingleToCloudinary(
        req.file,
        "profile-pictures",
        "image",
      );

      if (upr.failedToUpload) {
        res.status(400).json({
          error: "Failed to upload profile picture!",
        });
        return;
      }

      //Add default Profile picture
      if (user.profilePicture !== "") {
        const deleteResult = await deleteSingleFromCouldinary(
          user.profilePicture,
          "profile-pictures",
          "image",
        );

        if (deleteResult.failedToDelete) {
          res.status(500).json({
            error:
              "Failed to delete previous profile picture. Try again later!",
          });
          return;
        }
      }

      user.profilePicture = upr.result;
    }

    if (removeProfilePicture && removeProfilePicture === "true") {
      //Add default Profile picture
      if (user.profilePicture !== "") {
        const deleteResult = await deleteSingleFromCouldinary(
          user.profilePicture,
          "profile-pictures",
          "image",
        );

        if (deleteResult.failedToDelete) {
          res.status(500).json({
            error:
              "Failed to delete previous profile picture. Try again later!",
          });
          return;
        }
        //Add default Profile picture
        user.profilePicture = "";
      }
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

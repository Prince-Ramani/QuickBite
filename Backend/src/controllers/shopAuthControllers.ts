import { Request, Response } from "express";
import mongoose from "mongoose";
import { shopAccountInterface } from "../types/shop";
import { validateEmail } from "../services/email";

const phoneRegex = /^\d{10}$/;

export const switchAccount = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userID = req.user;
    if (!userID || !mongoose.isValidObjectId(userID)) {
      res.status(401).json({ err: "Unauthorized." });
      return;
    }

    const {
      ownerName,
      shopName,
      shopEmail,
      phoneNumber,
      shopAddress,
      shopPartners,
      shopLogo,
      shopPictures,
    }: shopAccountInterface = req.body;

    if (
      !ownerName ||
      ownerName.trim().length < 3 ||
      ownerName.trim().length > 12
    ) {
      res
        .status(400)
        .json({ error: "Owner name must be between 3 and 12 characters." });
      return;
    }

    if (
      !shopName ||
      shopName.trim().length < 3 ||
      shopName.trim().length > 12
    ) {
      res
        .status(400)
        .json({ error: "Shop name must be between 3 and 12 characters." });
      return;
    }

    if (!shopEmail) {
      res.status(400).json({ error: "shop Email required." });
      return;
    }

    const isvalidEmail = validateEmail(shopEmail);

    if (!isvalidEmail) {
      res.status(400).json({ error: "Invalid Email format." });
      return;
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
      res.status(400).json({ error: "Phone number required." });
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      res
        .status(400)
        .json({ error: "A phone number must have only 10 digits." });
      return;
    }

    if (!shopAddress || shopAddress.trim() === "") {
      res.status(400).json({ error: "Shop Address required." });
      return;
    }
  } catch (err) {
    console.log(
      "Error occured in switchAccountController in shopAuthController,ts file : ",
      err,
    );
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

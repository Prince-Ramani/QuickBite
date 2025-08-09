import Shop from "../models/shopModel";
import { shopAccountInterface } from "../types/shop";
import { validateEmail } from "../services/email";
import { isValidAddress } from "../services/openCage";
import {
  uploadToCloudinary,
  uploadSingleToCloudinary,
} from "../services/uploadToClodinary";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { upload } from "../cloudinary/cloudinary";
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

    if (!shopEmail || shopEmail.trim() === "") {
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

    const correctAddress = await isValidAddress(shopAddress);

    if (!correctAddress.isValid) {
      res.status(404).json({ error: "Please eneter valid address!" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let uploadedShopLogo = "";
    if (!!files.shopLogo && files.shopLogo.length !== 0) {
      const logo = files?.["shopLogo"];

      const upr = await uploadSingleToCloudinary(
        logo[0],
        "shop-logos",
        "image",
      );

      if (upr.failedToUpload) {
        res.status(400).json({
          error: "Failed to upload images!",
        });
        return;
      }
      uploadedShopLogo = upr.result;
    }

    if (!files.shopPictures || files.shopPictures.length === 0) {
      res.status(400).json({
        error: "At least 1 shop picture required to create shop account!",
      });
      return;
    }

    if (files.shopPictures.length > 4) {
      res.status(400).json({
        error: "A shop can only include maximum 4 shop pictures.",
      });
      return;
    }

    const shopImages = files?.["shopPictures"];

    const uploadResult = await uploadToCloudinary(
      shopImages,
      "shop-images",
      "image",
    );

    if (uploadResult.failedToUpload) {
      res.status(400).json({
        error: "Failed to uploade images!",
      });
      return;
    }

    let shopPart = shopPartners.map((p) => {
      return { name: p };
    });

    const newShop = new Shop({
      ownerName,
      phoneNumber,
      shopAddress: correctAddress.addInfo,
      shopEmail,
      shopName,
      shopPictures: uploadResult.result,
      shopPartners: shopPart,
      shopLogo: uploadedShopLogo || "",
    });

    await newShop.save();

    res.status(200).json({ message: "Shop account created." });
    return;
  } catch (err) {
    console.log(
      "Error occured in switchAccountController in shopAuthController,ts file : ",
      err,
    );
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

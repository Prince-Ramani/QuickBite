import { v2 as cloudinary } from "cloudinary";
import { promises as fspromises } from "fs";
import multer from "multer";
import { ExponentiationOperator } from "typescript";
interface utcInterface {
  failedToUpload: boolean;
  result: string[] | undefined;
}

const rootName = "QuickBite/";

type folderNameType =
  | "shop-images"
  | "shop-logos"
  | "profile-pictures"
  | "banners";

type resource_typetype = "image" | "raw" | "auto" | "video";

export const uploadToCloudinary = async (
  images: Express.Multer.File[],
  folder: folderNameType,
  resource_type: resource_typetype,
): Promise<utcInterface> => {
  let results: string[] = [];
  let failedToUpload = false;
  folder = rootName + folder;
  await Promise.all(
    images.map(async (img) => {
      try {
        const uploadResult = await cloudinary.uploader.upload(img.path, {
          resource_type,
          folder,
        });

        await fspromises.unlink(`../uploads/${img.filename}`);
        results.push(uploadResult.secure_url);
      } catch (err) {
        failedToUpload = true;
        console.error("failed to upload image : ", err);
      }
    }),
  );

  return {
    result: failedToUpload ? undefined : results,
    failedToUpload,
  };
};

export const uploadSingleToCloudinary = async (
  image: Express.Multer.File,
  folder: folderNameType,
  resource_type: resource_typetype,
): Promise<{
  result: string;
  failedToUpload: boolean;
}> => {
  let result: string = "";
  let failedToUpload = false;
  folder = rootName + folder;
  try {
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder,
      resource_type: resource_type,
    });
    await fspromises.unlink(`../uploads/${image.filename}`);
    result = uploadResult.secure_url;
  } catch (err) {
    failedToUpload = true;
    console.error("failed to upload image : ", err);
  }

  return {
    result,
    failedToUpload,
  };
};

export const deleteSingleFromCouldinary = async (
  image: string,
  folder: folderNameType,
  resource_type: "raw" | "image" | "video",
) => {
  let result = "";
  let failedToDelete = false;
  folder = rootName + folder;
  const imgPath = image.split("/").splice(-1)[0].split(".")[0];
  const imgID = `${folder}/${imgPath}`;
  try {
    const uploadResult = await cloudinary.uploader.destroy(imgID, {
      resource_type,
    });
    if (uploadResult.result !== "ok") failedToDelete = true;
  } catch (err) {
    failedToDelete = true;
    console.error("Failes to delete image : ", err);
  }
  return {
    result,
    failedToDelete,
  };
};

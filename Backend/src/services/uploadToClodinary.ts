import { v2 as cloudinary } from "cloudinary";
import { promises as fspromises } from "fs";
import multer from "multer";
import { ExponentiationOperator } from "typescript";
interface utcInterface {
  failedToUpload: boolean;
  result: string[] | undefined;
}

export const uploadeToCloudinary = async (
  images: Express.Multer.File[],
  folderName: string,
): Promise<utcInterface> => {
  let results: string[] = [];
  let failedToUpload = false;
  await Promise.all(
    images.map(async (img) => {
      try {
        const uploadResult = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
          folder: folderName,
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
  folderName: string,
): Promise<{
  result: string;
  failedToUpload: boolean;
}> => {
  let result: string = "";
  let failedToUpload = false;
  try {
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
      folder: folderName,
    });
    console.log(image.filename);
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

const deleteSingleFromCouldinary = async (
  image: string,
  resource_type: "image" | "raw" | "video",
) => {
  let result = "";
  let failedToDelete = false;
  const imgPath = image.split("/").splice(-1)[0].split(".")[0];
  // const imgID = `${ImageFolder}/${imgPath}`;
  try {
    const uploadResult = await cloudinary.uploader.destroy(image, {
      resource_type: resource_type || "image",
    });
    if (uploadResult.result === "ok") return;
    else failedToDelete = true;
  } catch (err) {
    failedToDelete = true;
    console.error("Failes to delete image : ", err);
  }
  return {
    result,
    failedToDelete,
  };
};

import { v2 as cloudinary } from "cloudinary";

cloudinary.config();

export const uploadImageToCloudinary = async (
  buffer: Buffer,
  folder: string,
  public_id?: string
) => {
  return new Promise((res, rej) => {
    const finalPublicId = public_id || `${folder}/${Date.now()}`;
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: finalPublicId,
        resource_type: "image",
        overwrite: true,
      },
      (error, result) => {
        if (error)
          return rej(new Error(`Error uploading image: ${error.message}`));
        if (!result)
          return rej(new Error("No response received from Cloudinary"));
        res(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  return new Promise<void>((res, rej) => {
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) return rej(new Error(`Error remove image: ${error.message}`));
      if (!result)
        return rej(new Error("No response received from Cloudinary"));
      if (result.result === "not found")
        return rej(
          new Error(`The image with public_id "${public_id}" not found`)
        );
      res();
    });
  });
};

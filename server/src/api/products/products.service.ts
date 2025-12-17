import dotenv from "dotenv";
import { Prisma } from "@generated/prisma/client";
import { prisma } from "@server/prisma";
import { createProductDto } from "@server/api/products/products.dto";
import { uploadImageToCloudinary } from "@server/services/cloudinary";
import { UploadApiResponse } from "cloudinary";

dotenv.config();

const getAll = async (searchTerm?: string, isAdminFlag?: boolean) => {
  let whereConditions;
  if (searchTerm) {
    whereConditions = {
      name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive },
    };
  }

  const selectAdmin = {
    id: true,
    name: true,
    imageUrl: true,
    price: true,
    stock: true,
    category: { select: { name: true } },
  };

  const selectPublic = {
    id: true,
    name: true,
    imageUrl: true,
    price: true,
  };

  const all = await prisma.products.findMany({
    where: whereConditions,
    select: isAdminFlag ? selectAdmin : selectPublic,
  });

  return all;
};

const getByCategoryId = async (categoryId: string) => {
  return prisma.products.findMany({
    where: { categoryId },
    select: {
      name: true,
      imageUrl: true,
      price: true,
    },
  });
};

const create = async (data: createProductDto, buffer?: Buffer) => {
  const folder = `${process.env.ROOT_FOLDER}/products-images`;

  let imgResult: UploadApiResponse | null = null;
  if (buffer) {
    imgResult = await uploadImageToCloudinary(buffer, folder);
  }

  await prisma.products.create({
    data: {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock) || 10,
      status: data.status || "available",
      categoryId: data.categoryId || "",
      imageUrl: imgResult?.secure_url ?? null,
    },
  });
};

export const ProductServices = {
  getAll,
  getByCategoryId,
  create,
};

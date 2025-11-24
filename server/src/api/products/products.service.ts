import { Prisma } from "@generated/prisma/client";
import { prisma } from "@server/prisma";

const findAllProducts = async (searchTerm?: string) => {
  const whereConditions = searchTerm
    ? { name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive }}
    : undefined

  const allProducts = await prisma.products.findMany({
    where: whereConditions,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true,
    },
  });
  return allProducts;
};

const findProductsByCategoryId = async (categoryId: string) => {
  return prisma.products.findMany({
    where: { categoryId },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true
    }
  })
}

export const ProductServices = {
  findAllProducts,
  findProductsByCategoryId
}

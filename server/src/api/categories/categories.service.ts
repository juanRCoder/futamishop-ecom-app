import { prisma } from "@server/prisma"

const findAllCategories = async () => {
  const allCategories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true
    }
  })
  return allCategories
}

export const CategoryServices = {
  findAllCategories
}
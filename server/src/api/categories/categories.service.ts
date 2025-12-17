import { prisma } from "@server/prisma"

const getAll = async () => {
  const all = await prisma.categories.findMany({
    select: {
      id: true,
      name: true
    }
  })
  return all
}

export const CategoryServices = {
  getAll
}
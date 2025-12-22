import { z } from "zod";

export const schemaProductForm = z.object({
  name: z.string().min(1, "Nombre de producto obligatorio!"),
  price: z.number().positive("El precio debe ser mayor a 0!"),
  stock: z.number().positive("El stock debe ser mayor a 0!").nonnegative("El stock no puede ser negativo!"),
  status: z.string().min(1, "Estado del producto obligatorio!"),
  imageUrl: z.any().optional().nullable(),
  imagePublicId: z.string().optional().nullable(),
  categoryId: z.string().min(1, "Categoría obligatoria!"),
});

export type TypeProductForm = z.infer<typeof schemaProductForm>;

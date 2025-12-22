import type { CategoryType } from "./categories.type";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  imagePublicId: string | null;
  stock?: number;
  status?: "available" | "unavailable";
  Categories?: CategoryType
};

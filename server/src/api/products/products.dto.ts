export interface createProductDto {
  name: string
  price: number
  stock: number
  status: string
  imageUrl?: string;
  categoryId: string
}
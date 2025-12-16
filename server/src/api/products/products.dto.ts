export interface createProductDto {
  name: string
  price: number
  stock: number
  status: string
  imageUrl: string | null
  categoryId: string
}
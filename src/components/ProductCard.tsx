import { useCartStore } from "@/stores/cart.store";
import type { productList } from "@/types/products.type";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: productList
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore()

  return (
    <Card className='rounded-md shadow flex flex-col justify-between p-4'>
      <CardContent className="flex flex-col gap-4 px-0">
        <img
          src={
            product.imageUrl ||
            "https://www.nestleprofessional-latam.com/sites/default/files/styles/np_product_detail/public/2023-01/CHOCOLATE-38-GR-X-20-UND-SUBLIME-SONRISA.jpg?itok=gXRByRju"
          }
          className="rounded-md object-cover opacity-90 max-h-48 h-48 w-auto"
        />
        <div className="flex flex-col items-start gap-2">
          <div>
            <p>{product.name}</p>
            <p className='font-semibold'>S/ {product.price.toFixed(2)}</p>
          </div>
          <Button
            variant={'secondary'}
            onClick={() => addItem({ ...product, quantity: 1 })}
            className='py-5 mt-2 cursor-pointer w-full'
          >
            Agregar al carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

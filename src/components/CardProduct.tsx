import { useCartStore } from "@/stores/cart.store";
import type { productList } from "@/types/products.type";

type CardProductProps = {
  product: productList
}

export const CardProduct = ({ product }: CardProductProps) => {
  const { addItem } = useCartStore()

  return (
    <div className='bg-white rounded-md shadow flex flex-col justify-between'>
      <div className='flex justify-center items-center flex-1'>
        <img
          src={product.imageUrl || '/default-img.png'}
          className={`
            rounded-t-md object-contain
            ${!product.imageUrl && 'opacity-50 scale-80'}
          `}
        />
      </div>
      <div className='rounded-b-md bg-white pt-3 pb-2 px-2 font-semibold'>
        <p>{product.name}</p>
        <p className='text-[#EC6D13] font-semibold'>S/ {product.price.toFixed(2)}</p>
        <button
          onClick={() => addItem({ ...product, quantity: 1 })}
          className='text-[#EC6D13] bg-[#FEE7D6] transition-colors py-1.5 px-3 rounded-md mt-2 cursor-pointer w-full'
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

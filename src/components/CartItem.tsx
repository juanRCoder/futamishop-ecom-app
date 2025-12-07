import { useCartStore } from "@/stores/cart.store"
import type { CartItemList } from "@/types/cart.type"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

type CartItemProps = {
  item: CartItemList
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore()

  const increase = () => updateQuantity(item.id, item.quantity + 1)
  const decrease = () => {
    if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1)
  }

  const IMG_DEFAULT = "https://www.nestleprofessional-latam.com/sites/default/files/styles/np_product_detail/public/2023-01/CHOCOLATE-38-GR-X-20-UND-SUBLIME-SONRISA.jpg?itok=gXRByRju"

  return (
    <div className="flex gap-3 items-stretch select-none">
      <div className="flex justify-center items-center rounded-md">
        <img
          src={item.imageUrl || IMG_DEFAULT}
          className={`
            object-contain max-h-24 h-24 w-36 rounded-md outline-1
            ${!item.imageUrl && 'opacity-50'}
          `}
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="relative">
          <p className="font-semibold">{item.name}</p>
          <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
          <Trash2 onClick={() => removeItem(item.id)} color="#e06666" className="absolute top-2 right-2 cursor-pointer" />
        </div>
        <div className="ml-auto flex items-center p-1 rounded-md outline-1">
          <Button variant="secondary" size={'icon-sm'} className="cursor-pointer" onClick={increase}>
            <Plus strokeWidth={3} />
          </Button>
          <span className="px-2 font-semibold w-10 text-center select-none">{item.quantity}</span>
          <Button variant="secondary" size={'icon-sm'} className="cursor-pointer" onClick={decrease}>
            <Minus strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  )
}

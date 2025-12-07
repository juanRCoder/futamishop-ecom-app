import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";
import ShopLayout from "@/layouts/ShopLayout";
import { CartItem } from "@/components/CartItem";
import { useCartStore } from "@/stores/cart.store";
import { Button } from "@/components/ui/button";


const Cart = () => {
  const navigate = useNavigate()
  const { items } = useCartStore()

  const totalProductInCart = items.reduce((acc, p) => (acc + p.price) * p.quantity, 0);
  return (
    <ShopLayout>
      <div className='bg-background text-foreground flex items-center p-4 border-b'>
        <ArrowLeft onClick={() => navigate('/')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Carrito</h2>
      </div>
      <div className='py-4 px-3 flex flex-col gap-6 flex-1'>
        {items && items.length > 0 ? (
          items.map((item, i) => (
            <CartItem key={i} item={item} />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center text-center select-none">
            No hay productos en el carrito
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between pb-6 px-3 border-t-2 pt-2 font-semibold">
          <p>Total:</p>
          <p>S/ {totalProductInCart.toFixed(2)}</p>
        </div>
        <div className="px-3">
          <Button
            onClick={() => navigate('/checkout')}
            disabled={items.length === 0}
            className={`w-full py-5 mb-4
              ${items.length > 0 ? 'cursor-pointer' : 'bg-primary/50 select-none' }
            `}
          >
            Pagar
          </Button>
          {/* <button
            onClick={() => navigate('/checkout')}
            disabled={items.length === 0}
            className={`mb-4 py-3 px-3 rounded-md text-sm w-full
              ${items.length > 0 ? 'bg-[#EC6D13] cursor-pointer' : 'bg-[#EC6D13]/60 select-none'}
            `}
          >
            Pagar
          </button> */}
        </div>
      </div>
    </ShopLayout>
  )
}

export default Cart;
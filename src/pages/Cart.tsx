import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";
import ShopLayout from "@/layouts/ShopLayout";
import { CartItem } from "@/components/CartItem";
import { useCartStore } from "@/stores/cart.store";


const Cart = () => {
  const navigate = useNavigate()
  const { items } = useCartStore()

  const totalProductInCart = items.reduce((acc, p) => (acc + p.price) * p.quantity, 0);
  return (
    <ShopLayout>
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm'>
        <ArrowLeft onClick={() => navigate('/')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Carrito</h2>
      </div>
      {/* CONTENT */}
      <div className='py-4 px-3 flex flex-col justify-center items-center gap-6 flex-1'>
        {items && items.length > 0 ? (
          items.map((item, i) => (
            <CartItem key={i} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 select-none">
            No hay productos en el carrito
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between pb-6 px-3 border-t-2 border-gray-300 pt-2 font-semibold">
          <p>Total:</p>
          <p>S/ {totalProductInCart.toFixed(2)}</p>
        </div>
        <div className="px-3">
          <button onClick={() => navigate('/checkout')} className="cursor-pointer bg-[#EC6D13] text-white mb-4 py-3 px-3 rounded-md text-sm w-full">
            Pagar
          </button>
        </div>
      </div>
    </ShopLayout>
  )
}

export default Cart;
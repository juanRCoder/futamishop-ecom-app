import { Download, CreditCard, User2, Store, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ShopLayout from "@/layouts/ShopLayout";
import { useVoucherStore } from "@/stores/voucher.store";


const Voucher = () => {
  const navigate = useNavigate()
  const { voucher } = useVoucherStore()

  const PaymentIcon = voucher?.typeOfDelivery === "delivery" ? CreditCard : Coins;

  return (
    <ShopLayout>
      <section className="bg-[#F3F4F6] flex-1 flex flex-col">
        <div className='bg-white flex items-center justify-between p-4 shadow-sm'>
          <h2 className="text-2xl text-center flex-1 font-semibold">Voucher</h2>
          <Download className='absolute right-4 cursor-pointer' />
        </div>
        <div className="flex-1 flex items-center justify-center my-10">
          <div className="bg-white w-full mx-4 rounded-2xl max-w-md shadow-sm">
            <div className="flex flex-col gap-1 py-5">
              <h3 className="text-xl text-center font-semibold">FutamiShop</h3>
              <p className="text-sm text-center text-gray-400">Av. Siempre Viva 742</p>
            </div>
            <p className="text-sm text-center text-gray-400 border-b border-dashed border-gray-300 pb-5 mx-4">
              {voucher?.createdAt || '15 de mayo de 2024, 15:30'}
            </p>
            <div className="flex flex-col gap-2 py-5 border-b border-dashed border-gray-300 mx-4">
              {voucher?.products.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_auto] items-center mx-4 gap-x-2">
                  <p className="text-gray-500">
                    {item.name} x{item.quantity}
                  </p>
                  <p>S/{item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-5 pb-2 border-b border-gray-300 mx-4">
              <div className="text-center flex justify-between mx-4">
                <p className="text-gray-500">Subtotal</p>
                <p>S/{voucher?.subtotal.toFixed(2)}</p>
              </div>
              <div className="text-center flex justify-between mx-4">
                <p className="text-gray-500">Costo de envio</p>
                <p>S/{voucher?.deliveryCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-center flex justify-between mx-4 font-bold mb-5 px-4 pt-3 pb-5 border-b border-dashed border-gray-300">
              <p>Total</p>
              <p>S/{voucher?.total.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mx-4">
                <User2 size={32} color="#99a1af " />
                <div className="flex flex-col">
                  <p>{voucher?.guestUserName}</p>
                  <p className="text-gray-400 text-sm">Cliente</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mx-4">
                <PaymentIcon size={32} color="#99a1af " />
                <div className="flex flex-col">
                  <p>{voucher?.typeOfDelivery === "delivery" ? "Transferencia Bancaria" : "Efectivo"}</p>
                  <p className="text-gray-400 text-sm">Metodo de pago</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-10 mb-4">
              <p>Pedido #{voucher?.id.slice(-6)}</p>
              <p className="text-sm text-gray-400">!Gracias por tu compra!</p>
            </div>
          </div>
        </div>
        <div className='bg-white flex items-center justify-between p-4'>
          <div className="px-3 w-full">
            <button onClick={() => navigate('/')} className="flex justify-center items-center gap-2 cursor-pointer bg-[#EC6D13] text-white py-3 px-3 rounded-md text-sm w-full">
              <Store /> Volver a la tienda
            </button>
          </div>
        </div>
      </section>
    </ShopLayout>
  )
}

export default Voucher;
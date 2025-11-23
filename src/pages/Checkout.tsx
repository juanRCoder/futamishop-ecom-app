import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ShopLayout from "@/layouts/ShopLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/FormInput";
import { FormInputRadio } from "@/components/FormInputRadio";
import { useCreateOrder } from "@/hooks/useOrders";
import { schemaCheckoutForm, type TypeCheckoutForm } from "@/schemas/checkout.schema";
import { useCartStore } from "@/stores/cart.store";
import { useVoucherStore } from "@/stores/voucher.store";
import { defaultCheckoutForm } from "@/utils/default";


const Checkout = () => {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const { setVoucher } = useVoucherStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<TypeCheckoutForm>({
    resolver: zodResolver(schemaCheckoutForm),
    defaultValues: defaultCheckoutForm
  })

  const typeOfDeliveryValue = watch("typeOfDelivery");
  const typeOfPaymentValue = watch("typeOfPayment")

  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder({
    onSuccess(data) {
      clearCart()
      setVoucher(data.payload)
      navigate('/voucher')
    },
    onError(error) {
      console.log(error)
    }
  })

  const onSubmit = (data: TypeCheckoutForm) => {
    if (data.typeOfDelivery === 'local') {
      delete data.guestUserAddress
    }

    const newOrder = {
      ...data,
      ...(data.typeOfPayment === 'bank' && { imageVoucher: null }),
      products: items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    }
    createOrder(newOrder)
  }

  const totalProductInCart = items.reduce((acc, p) => (acc + p.price) * p.quantity, 0);
  const addAmountForDelivery = typeOfDeliveryValue === 'delivery' ? 3 : 0;

  return (
    <ShopLayout>
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm'>
        <ArrowLeft onClick={() => navigate('/cart')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Finalizar Compra</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-3 px-3 pt-3">
          <FormInput
            id="guestUserName"
            label="Nombre de cliente"
            placeholder="Ingresa tu nombre"
            {...register("guestUserName")}
            error={errors.guestUserName?.message}
          />
          <FormInput
            id="guestUserPhone"
            label="Número de teléfono de cliente"
            placeholder="Ingresa tu número"
            {...register("guestUserPhone")}
            error={errors.guestUserPhone?.message}
          />
        </section>
        <section className="px-3">
          <h3 className="font-semibold my-4">Tipo de Entrega</h3>
          <div className="flex flex-col gap-4">
            <FormInputRadio
              {...register("typeOfDelivery")}
              value="local"
              label="Recogida local"
              checked={typeOfDeliveryValue === "local"}
              onChange={() => {
                setValue("typeOfDelivery", "local");
                setValue("guestUserAddress", "");
                clearErrors("typeOfDelivery");
              }}
            />
            <FormInputRadio
              {...register("typeOfDelivery")}
              value="delivery"
              label="A domicilio"
              checked={typeOfDeliveryValue === "delivery"}
              onChange={() => {
                setValue("typeOfDelivery", "delivery")
                clearErrors("typeOfDelivery");
              }}
            />
            {errors.typeOfDelivery && <p className="text-sm text-red-400">{errors.typeOfDelivery.message}</p>}
          </div>
        </section>
        {typeOfDeliveryValue === "delivery" && (
          <section className="flex flex-col gap-3 px-3 pt-3">
            <FormInput
              id="guestUserAddress"
              label="Direccion domiciliaria del cliente"
              placeholder="Ingresa tu direccion domiciliaria"
              {...register("guestUserAddress")}
              error={errors.guestUserAddress?.message}
            />
          </section>
        )}
        <section className="px-3">
          <h3 className="font-semibold my-4">Método de Pago</h3>
          <div className="flex flex-col gap-4">
            <FormInputRadio
              {...register("typeOfPayment")}
              value="cash"
              label="Efectivo"
              checked={typeOfPaymentValue === "cash"}
              onChange={() => {
                setValue("typeOfPayment", "cash");
                clearErrors("typeOfPayment");
              }}
            />
            <FormInputRadio
              {...register("typeOfPayment")}
              value="bank"
              label="Bancario"
              checked={typeOfPaymentValue === "bank"}
              onChange={() => {
                setValue("typeOfPayment", "bank");
                clearErrors("typeOfPayment");
              }}
            />
            {errors.typeOfPayment && <p className="text-sm text-red-400">{errors.typeOfPayment.message}</p>}
          </div>
        </section>
        {typeOfPaymentValue === "bank" && (
          <section className="flex flex-col gap-3 p-3 text-gray-400 outline-1 outline-gray-200 mx-4 mt-3 rounded-lg">
            proximamente agregado de voucher de pago
          </section>
        )}
        <section className="flex flex-col gap-3 px-3 pt-3">
          <label htmlFor="notes" className="text-gray-500 text-sm">Notas para la tienda</label>
          <textarea
            className="outline-none rounded-md p-2 min-h-20 resize-none bg-gray-100"
            id="notes"
            placeholder="Escribe alguna nota para la tienda, sencillo de dinero, cambio, etc."
            {...register("notes")}
          />
          {errors.notes && <p className="text-sm text-red-400">{errors.notes.message}</p>}
        </section>
        {/* RESUMEN */}
        <div className="outline-1 outline-gray-200 mx-3 mt-10 rounded-lg">
          <h3 className="font-semibold p-3">Resumen</h3>
          <div className="flex justify-between border-t-2 border-t-[#F3F4F6] py-2 mx-3 text-sm">
            <p>Total productos</p>
            <p>S/ {totalProductInCart.toFixed(2)}</p>
          </div>
          {typeOfDeliveryValue === 'delivery' && (
            <div className="flex justify-between border-t-2 border-t-[#F3F4F6] py-2 mx-3 text-sm">
              <p>Delivery</p>
              <p>S/ 3.00</p>
            </div>
          )}
          <div className="flex justify-between border-t-2 border-t-[#F3F4F6] py-2 mx-3 text-sm font-semibold">
            <p className="">Total</p>
            <p className="text-orange-500">S/ {(totalProductInCart + addAmountForDelivery).toFixed(2)}</p>
          </div>
        </div>
        <div className="px-3 py-5">
          <button type="submit" className="cursor-pointer bg-[#EC6D13] text-white py-3 rounded-md text-sm w-full p-3">
            {isCreatingOrder ? 'Procesando compra...' : 'Finalizar compra'}
          </button>
        </div>
      </form>
    </ShopLayout>
  )
}

export default Checkout;
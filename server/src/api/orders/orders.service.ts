import { prisma } from "@server/prisma";
import { orderedProduct, orderListDto } from "./orders.dto";
import { formatVoucherDate } from "@server/utils/date.utils";

const findAllOrders = async () => {
  const allCategories = await prisma.orders.findMany({
    select: {
      id: true,
      guestUserName: true,
      guestUserPhone: true,
      typeOfDelivery: true,
      guestUserAddress: true,
      typeOfPayment: true,
      imageVoucher: true,
      notes: true,
      total: true,
      status: true,
    },
  });
  return allCategories;
};

const createOrder = async (
  orderData: orderListDto,
  products: orderedProduct[]
) => {
  const selectProducts = products.map((p) => p.id);
  const dbProducts = await prisma.products.findMany({
    where: { id: { in: selectProducts } },
  });

  const orderProducts = products.map((pr) => {
    const dbProduct = dbProducts.find((dpr) => dpr.id === pr.id);
    const subtotal = dbProduct ? dbProduct.price * pr.quantity : 0;

    return {
      productId: pr.id,
      quantity: pr.quantity,
      price: pr.price,
      subtotal,
    };
  });

  const totalProducts = orderProducts.reduce(
    (acc, op) => acc + (op.subtotal ?? 0),
    0
  );
  const newOrder = await prisma.orders.create({
    data: {
      ...orderData,
      total: totalProducts,
      orderProducts: {
        createMany: {
          data: orderProducts,
        },
      },
    },
  });

  const voucher = await prisma.orders.findUnique({
    where: { id: newOrder.id },
    include: {
      orderProducts: {
        include: { product: true },
      },
    },
  });
  const voucherProducts = voucher?.orderProducts.map((op) => ({
    name: op.product.name,
    quantity: op.quantity,
    subtotal: op.subtotal,
  }));

  const deliveryCost = voucher?.typeOfDelivery === "delivery" ? 3 : 0; // add 3 soles
  return {
    id: voucher?.id,
    createdAt: formatVoucherDate(voucher?.createdAt.toISOString() || ""),
    products: voucherProducts,
    subtotal: totalProducts,
    deliveryCost,
    total: (voucher?.total ?? 0) + deliveryCost,
    guestUserName: voucher?.guestUserName,
    typeOfDelivery: voucher?.typeOfDelivery,
  };
};

export const OrderServices = {
  findAllOrders,
  createOrder,
};

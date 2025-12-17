import dotenv from "dotenv";
import { prisma } from "@server/prisma";
import { UploadApiResponse } from "cloudinary";
import { orderedProductDto, createOrderDto } from "./orders.dto";
import { formatVoucherDate } from "@server/utils/date.utils";
import { uploadImageToCloudinary } from "@server/services/cloudinary";

dotenv.config();

const getAll = async () => {
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

const create = async (
  orderData: createOrderDto,
  products: orderedProductDto[],
  buffer?: Buffer
) => {
  const folder = `${process.env.ROOT_FOLDER}/voucher-images`;

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

  let imgResult: UploadApiResponse | null = null;
  if (buffer && orderData.typeOfPayment === "bank") {
    imgResult = await uploadImageToCloudinary(buffer, folder);
  }

  const totalProducts = orderProducts.reduce(
    (acc, op) => acc + (op.subtotal ?? 0),
    0
  );

  const orderPayload = {
    ...orderData,
    total: totalProducts,
    orderProducts: {
      createMany: { data: orderProducts },
    },
  };
  if (imgResult) orderPayload.imageVoucher = imgResult.secure_url;

  const newOrder = await prisma.orders.create({
    data: orderPayload,
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
  getAll,
  create,
};

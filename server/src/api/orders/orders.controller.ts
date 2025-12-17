import { Request, Response, NextFunction } from "express";
import { OrderServices } from "./orders.service";
import { HttpStatus } from "@server/constants/HttpStatus";
import { apiResponse } from "@server/utils/apiResponse.utils";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderServices.getAll();

    if (!orders.length) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(apiResponse(false, { message: "There are no orders" }));
    }
    return res.status(HttpStatus.OK).json(apiResponse(true, orders));
  } catch (error) {
    console.error("[Controller: getAll]", error);
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { products, ...orderData } = req.body;
  const imageVoucher = req.file?.buffer;

  if (!products) {
    return res.status(HttpStatus.BAD_REQUEST).json(
      apiResponse(false, {
        message: "There are no products for the order",
      })
    );
  }

  const parsedProducts =
    typeof products === "string" ? JSON.parse(products) : products;

  try {
    const createdOrder = await OrderServices.create(
      orderData,
      parsedProducts,
      imageVoucher
    );
    return res.status(HttpStatus.OK).json(apiResponse(true, createdOrder));
  } catch (error) {
    console.error("[Controller: createOrder]", error);
    next(error);
  }
};

import { Router } from "express";
import {
  getAllOrders,
  createOrder,
} from "@server/api/orders/orders.controller";
import { uploader } from "@server/middlewares/imageUpload.middlware";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/", uploader("imageVoucher"), createOrder);

export default orderRouter;

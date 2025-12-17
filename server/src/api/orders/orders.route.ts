import { Router } from "express";
import { getAll, create } from "@server/api/orders/orders.controller";
import { uploader } from "@server/middlewares/imageUpload.middlware";

const orderRouter = Router();

orderRouter.get("/", getAll);
orderRouter.post("/", uploader("imageVoucher"), create);

export default orderRouter;

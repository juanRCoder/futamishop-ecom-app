import { Router } from "express";
import { param } from "express-validator";
import {
  get,
  getByCategoryId,
  create,
} from "@server/api/products/products.controller";
import { uploader } from "@server/middlewares/imageUpload.middlware";

const productRouter = Router();
const params = param("id").isUUID().withMessage(`Invalid category ID`);

productRouter.get("/", get);
productRouter.get("/category/:id", params, getByCategoryId);
productRouter.post("/", uploader("imageProduct"), create);

export default productRouter;

import { Router } from "express";
import { param } from "express-validator";
import {
  getAll,
  getByCategoryId,
  create,
  getById,
  update,
  remove,
} from "@server/api/products/products.controller";
import { uploader } from "@server/middlewares/imageUpload.middlware";

const productRouter = Router();

const validateUUID = (fieldName: string) =>
  param("id").isUUID().withMessage(`Invalid ${fieldName} ID`);

productRouter.get("/", getAll);
productRouter.get("/category/:id", validateUUID("category"), getByCategoryId);
productRouter.post("/", uploader("imageUrl"), create);
productRouter.get("/:id", validateUUID("product"), getById);
productRouter.patch(
  "/:id",
  validateUUID("product"),
  uploader("imageUrl"),
  update
);
productRouter.delete("/:id", validateUUID("product"), remove);

export default productRouter;

import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "@server/constants/HttpStatus";
import { apiResponse } from "@server/utils/apiResponse.utils";
import { ProductServices } from "@server/api/products/products.service";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { searchTerm, isAdmin } = req.query;
  const term = typeof searchTerm === "string" ? searchTerm : undefined;
  const isAdminFlag = typeof isAdmin === "string" && isAdmin === "true";

  try {
    const products = await ProductServices.getAll(term, isAdminFlag);

    if (!products.length) {
      return res.status(HttpStatus.OK).json(apiResponse(true, []));
    }

    return res.status(HttpStatus.OK).json(apiResponse(true, products));
  } catch (error) {
    console.error("[Controller: getAll]", error);
    next(error);
  }
};

export const getByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const products = await ProductServices.getByCategoryId(id);

    if (!products.length) {
      return res.status(HttpStatus.NOT_FOUND).json(
        apiResponse(false, {
          message: "No se encontraron productos para esta categoría",
        })
      );
    }

    return res.status(HttpStatus.OK).json(apiResponse(true, products));
  } catch (error) {
    console.error("[Controller: getProductsByCategoryId]", error);
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const imageProduct = req.file?.buffer;
    await ProductServices.create(data, imageProduct);

    return res.status(HttpStatus.CREATED).json(
      apiResponse(true, {
        message: "Producto creado exitosamente",
      })
    );
  } catch (error) {
    console.error("[Controller: createProduct]", error);
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "@server/constants/HttpStatus";
import { apiResponse } from "@server/utils/apiResponse.utils";
import { CategoryServices } from "@server/api/categories/categories.service";

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoryServices.getAll();

    if (!categories.length) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(apiResponse(false, { message: "There are no categories" }));
    }

    return res.status(HttpStatus.OK).json(apiResponse(true, categories));
  } catch (error) {
    console.error("[Controller: getAll]", error);
    next(error);
  }
};

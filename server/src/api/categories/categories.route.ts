import { Router } from "express";
import { getAll } from "@server/api/categories/categories.controller";

const categoryRouter = Router();

categoryRouter.get("/", getAll);

export default categoryRouter;

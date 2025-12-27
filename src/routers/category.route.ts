import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategoryController);
categoryRouter.get("/", getCategoriesController);
categoryRouter.put("/:id", updateCategoryController);
categoryRouter.delete("/:id", deleteCategoryController);

export default categoryRouter;
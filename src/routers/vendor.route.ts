import { Router } from "express";
import {
  createVendorController,
  getVendorsController,
  updateVendorController,
  deleteVendorController,
} from "../controllers/vendor.controller";
import { authenticate } from "../middlewares/auth.middleware";

const vendorRouter = Router();

vendorRouter.post("/", authenticate, createVendorController);
vendorRouter.get("/", authenticate, getVendorsController);
vendorRouter.put("/:id", authenticate, updateVendorController);
vendorRouter.delete("/:id", authenticate, deleteVendorController);

export default vendorRouter;
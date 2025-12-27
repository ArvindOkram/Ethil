import { Request, Response, NextFunction } from "express";
import { addVendor, getVendors, updateVendorDetails, removeVendor }  from "../services/vendor.service";

export const createVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await addVendor(req.body);
    res.status(201).json({
      success: true,
      data: vendor,
    });
  } catch (err: any) {
    console.error('Error at [VendorController :: createVendorController]:', {
        message: err.message,
        stack: err.stack,
    });
    next({
      status: 500,
      message: "Internal Server Error",
    });  }
};

export const getVendorsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendors = await getVendors();
    res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (err: any) {
    console.error('Error at [VendorController :: getVendorsController]:', {
        message: err.message,
        stack: err.stack,
    });
    next({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const updateVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await updateVendorDetails(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: vendor,
    });
  } catch (err: any) {
    console.error('Error at [VendorController :: updateVendorController]:', {
        message: err.message,
        stack: err.stack,
    });
    next({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

/**
 * DELETE /vendors/:id
 */
export const deleteVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await removeVendor(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error('Error at [VendorController :: deleteVendorController]:', {
        message: err.message,
        stack: err.stack,
    });
    next({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

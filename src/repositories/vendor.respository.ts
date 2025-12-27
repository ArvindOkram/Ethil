import { Types } from "mongoose";
import { VendorModel } from "../schema/vendor.schema";
import { createVendorDTO } from "../commons/interface/vendor.interface";

// CREATE
export const createVendor = async (data: createVendorDTO) => {
  return VendorModel.create({
    ...data,
    category: new Types.ObjectId(data.category),
  });
};

// READ - all vendors
export const findAllVendors = async () => {
  return VendorModel.find()
    .populate("category", "name", "description")
    .lean();
};

export const findVendorsByCategory = async (categoryId: string) => {
  if (!Types.ObjectId.isValid(categoryId)) return [];

  return VendorModel.find({
    category: new Types.ObjectId(categoryId),
  })
    .populate("category", "name", "description")
    .lean();
};

// READ - by id
export const findVendorById = async (vendorId: string) => {
  if (!Types.ObjectId.isValid(vendorId)) return null;

  return VendorModel.findById(vendorId)
    .populate("category", "name")
    .lean();
};

// UPDATE
export const updateVendorById = async (
  vendorId: string,
  updateData: Partial<{
    name: string;
    category: string;
    description: string;
  }>
) => {
  if (!Types.ObjectId.isValid(vendorId)) return null;

  const payload: any = { ...updateData };

  if (updateData.category) {
    payload.category = new Types.ObjectId(updateData.category);
  }

  return VendorModel.findByIdAndUpdate(
    vendorId,
    payload,
    { new: true }
  )
    .populate("category", "name")
    .lean();
};

// DELETE
export const deleteVendorById = async (vendorId: string) => {
  if (!Types.ObjectId.isValid(vendorId)) return null;

  return VendorModel.findByIdAndDelete(vendorId);
};

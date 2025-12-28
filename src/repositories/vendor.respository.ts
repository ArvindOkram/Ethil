import { Types } from "mongoose";
import { VendorModel } from "../schema/vendor.schema";
import { createVendorDTO } from "../commons/interface/vendor.interface";

// CREATE
 const createVendor = async (data: createVendorDTO) => {
  return VendorModel.create({
    ...data,
    category: new Types.ObjectId(data.category),
  });
};

// READ - all vendors
 const findAllVendors = async () => {
  return VendorModel.find()
    .populate("category", "name", "description")
    .lean();
};

 const findVendorsByCategory = async (categoryId: string) => {
  if (!Types.ObjectId.isValid(categoryId)) return [];

  return VendorModel.find({
    category: new Types.ObjectId(categoryId),
  })
    .populate("category", "name", "description")
    .lean();
};

// READ - by id
 const findVendorById = async (vendorId: string) => {
  if (!Types.ObjectId.isValid(vendorId)) return null;

  return VendorModel.findById(vendorId)
    .populate("category", "name")
    .lean();
};

// UPDATE
 const updateVendorById = async (
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
 const deleteVendorById = async (vendorId: string) => {
  if (!Types.ObjectId.isValid(vendorId)) return null;

  return VendorModel.findByIdAndDelete(vendorId);
};

const getVendorsByIds = async (vendorIds: string[]) => {
  try {
    return VendorModel.find({ _id: { $in: vendorIds } }).lean();
  } catch (error) {
    throw new Error("Error fetching vendors by IDs");
  }
}

export default {
  createVendor,
  findAllVendors,
  findVendorsByCategory,
  findVendorById,
  updateVendorById,
  deleteVendorById,
  getVendorsByIds
}
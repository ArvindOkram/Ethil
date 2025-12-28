import { createVendorDTO } from "../commons/interface/vendor.interface";
import vendorRepsitory from "../repositories/vendor.respository";

/**
 * Add a new vendor
 */
const addVendor = async (vendorData: createVendorDTO) => {
  try {
    if (!vendorData.name || !vendorData.category) {
      throw new Error("Vendor name and category are required");
    }
  
    return vendorRepsitory.createVendor(vendorData);
  } catch (error) {
    throw new Error("Error validating vendor data");
  }
};

/**
 * Get all vendors
 */
const getVendors = async () => {
  return vendorRepsitory.findAllVendors();
};

/**
 * Remove vendor by ID
 */
const removeVendor = async (vendorId: string) => {
  const vendor = await vendorRepsitory.findVendorById(vendorId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  await vendorRepsitory.deleteVendorById(vendorId);
  return { success: true };
};

/**
 * Update vendor details
 */
const updateVendorDetails = async (
  vendorId: string,
  updateData: Partial<{
    name: string;
    category: string;
    description: string;
  }>
) => {
  const updatedVendor = await vendorRepsitory.updateVendorById(vendorId, updateData);

  if (!updatedVendor) {
    throw new Error("Vendor not found or update failed");
  }

  return updatedVendor;
};

export {
  addVendor,
  getVendors,
  removeVendor,
  updateVendorDetails,
};
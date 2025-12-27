import { Types } from "mongoose";

// Schema Interface
export interface IVendor {
  _id: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface createVendorDTO {
  name: string;
  category: string; // incoming as string
  description?: string;
}

export interface updateVendorDTO {
  name?: string;
  category?: string;
  description?: string;
}

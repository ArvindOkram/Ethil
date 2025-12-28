import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: { type: String, required: [true, "Category is required"] },
    vendorId: { type: String, required: [true, "Vendor is required"] },
    vendorName: { type: String, required: [true, "Vendor Name is required"] },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("Item", itemSchema);
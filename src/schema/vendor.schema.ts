import { Schema, model } from "mongoose";

const vendorSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], unique: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: [true, "Category is required"] },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export const VendorModel = model("Vendor", vendorSchema);

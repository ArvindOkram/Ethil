import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], unique: true },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export const CategoryModel = model("Category", categorySchema);

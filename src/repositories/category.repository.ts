import { CategoryModel } from "../schema/category.schema";
import { Types } from "mongoose";
import {
  createCategoryDTO,
  updateCategoryDTO,
} from "../commons/interface/category.interface";

// CREATE
const createCategoryRepo = async (data: createCategoryDTO) => {
  return CategoryModel.create(data);
};

// READ - all
const findAllCategoriesRepo = async () => {
  return CategoryModel.find().lean();
};

// READ - by id
const findCategoryByIdRepo = async (categoryId: string) => {
  if (!Types.ObjectId.isValid(categoryId)) return null;

  return CategoryModel.findById(categoryId).lean();
};

// UPDATE
const updateCategoryByIdRepo = async (
  categoryId: string,
  updateData: updateCategoryDTO
) => {
  if (!Types.ObjectId.isValid(categoryId)) return null;

  return CategoryModel.findByIdAndUpdate(
    categoryId,
    updateData,
    { new: true }
  ).lean();
};

// DELETE
const deleteCategoryByIdRepo = async (categoryId: string) => {
  if (!Types.ObjectId.isValid(categoryId)) return null;

  return CategoryModel.findByIdAndDelete(categoryId);
};

export default {
  createCategoryRepo,
  findAllCategoriesRepo,
  findCategoryByIdRepo,
  updateCategoryByIdRepo,
  deleteCategoryByIdRepo
};
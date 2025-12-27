import categoryRepository from "../repositories/category.repository";
import {
  createCategoryDTO,
  updateCategoryDTO,
} from "../commons/interface/category.interface";

export const addCategory = async (data: createCategoryDTO) => {
  if (!data.name) {
    throw new Error("Category name is required");
  }

  return categoryRepository.createCategoryRepo(data);
};

export const getCategories = async () => {
  return categoryRepository.findAllCategoriesRepo();
};

export const updateCategoryDetails = async (
  categoryId: string,
  updateData: updateCategoryDTO
) => {
  const updatedCategory = await categoryRepository.updateCategoryByIdRepo(
    categoryId,
    updateData
  );

  if (!updatedCategory) {
    throw new Error("Category not found");
  }

  return updatedCategory;
};

export const removeCategory = async (categoryId: string) => {
  const category = await categoryRepository.findCategoryByIdRepo(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  await categoryRepository.deleteCategoryByIdRepo(categoryId);

  return { success: true };
};

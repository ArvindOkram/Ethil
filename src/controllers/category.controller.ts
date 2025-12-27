import { Request, Response, NextFunction } from "express";
import {
    addCategory,
    getCategories,
    updateCategoryDetails,
    removeCategory,
} from "../services/category.service";

export const createCategoryController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await addCategory(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (err: any) {
        console.error("Error at [CategoryController :: createCategoryController]", err);
        next({ status: 500, message: err.message });
    }
};

export const getCategoriesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await getCategories();
        res.status(200).json({ success: true, data: categories });
    } catch (err: any) {
        console.error("Error at [CategoryController :: getCategoriesController]", err);
        next({ status: 500, message: err.message });
    }
};

export const updateCategoryController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await updateCategoryDetails(
            req.params.id,
            req.body
        );
        res.status(200).json({ success: true, data: category });
    } catch (err: any) {
        console.error("Error at [CategoryController :: updateCategoryController]", err);
        next({ status: 500, message: err.message });
    }
};

export const deleteCategoryController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await removeCategory(req.params.id);
        res.status(200).json({ success: true, data: result });
    } catch (err: any) {
        console.error("Error at [CategoryController :: deleteCategoryController]", err);
        next({ status: 500, message: err.message });
    }
};

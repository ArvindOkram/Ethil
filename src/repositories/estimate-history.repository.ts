import { EstimateHistoryModel } from "../schema/estimate-history.schema";
import { Types } from "mongoose";

export const createEstimateHistoryRepo = (payload: any) => {
  return EstimateHistoryModel.create(payload);
};

export const getEstimateHistoryByIdRepo = (estimateId: string) => {
  return EstimateHistoryModel.findById(estimateId)
    .populate("items.itemId")
    .populate("items.vendorId")
    .populate("userId");
};

export const getEstimateHistoryByUserRepo = (userId: string) => {
  return EstimateHistoryModel.find({ userId: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 });
};

export const updateEstimateHistoryRepo = (
  estimateId: string,
  payload: any
) => {
  return EstimateHistoryModel.findByIdAndUpdate(
    estimateId,
    payload,
    { new: true }
  );
};

export const deleteEstimateHistoryRepo = (estimateId: string) => {
  return EstimateHistoryModel.findByIdAndDelete(estimateId);
};

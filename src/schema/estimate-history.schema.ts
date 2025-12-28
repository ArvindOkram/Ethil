import { Schema, model } from "mongoose";

const estimateItemSchema = new Schema(
    {
        itemId: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        vendorId: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        },
        
        vendorName: {
            type: String,
            required: false,
            default: null
        }
    }
);

const estimateHistorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: {
            type: [estimateItemSchema],
            required: true,
        },

        totalEstimate: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const EstimateHistoryModel = model("EstimateHistory", estimateHistorySchema);
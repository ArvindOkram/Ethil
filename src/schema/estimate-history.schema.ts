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

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const EstimateHistoryModel = model("EstimateHistory", estimateHistorySchema);
import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: [true, "Name is required"] },
        phone_number: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        image: {
            type: String,
            default: "https://placehold.co/600x400",
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true,
        },
        resetCode: {
            data: String,
            expiresAt: {
                type: Date,
                default: () => new Date.now() + 10 * 60 * 1000,
            },
        },
    },
    {
            timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
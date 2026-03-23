import mongoose from "mongoose";
import category from "./category";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        thumb_image: {
            type: String,
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
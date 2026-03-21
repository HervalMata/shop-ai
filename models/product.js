import mongoose from "mongoose";
import category from "./category";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
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
            required: true,
        },
        sort_description: {
            type: String,
        },
        long_description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        offer_price: {
            type: Number,
        },
        sku: {
            type: String,
        },
        seo_title: {
            type: String,
            required: true,
        },
        show_at_home: {
            type: Boolean,
            default: false,
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

export default mongoose.models.Product || 
    mongoose.model("Product", productSchema);
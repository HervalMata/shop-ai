import mongoose from "mongoose";
import User from "./user";
import Orders from "./orders";
import Product from "./product";

const productRatingSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders",
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        review: {
            type: String,
            trim: true,
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

export default mongoose.models.ProductRating ||
    mongoose.model("ProductRating", productRatingSchema);

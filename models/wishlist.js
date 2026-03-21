import mongoose from "mongoose";
import User from "./user";
import Product from "./product";

const wishlistSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Wishlist ||
    mongoose.model("Wishlist", wishlistSchema);
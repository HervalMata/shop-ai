import mongoose from "mongoose";
import Product from "./product";
import ProductSize from "./productSize";
import ProductOption from "./productOption";
import User from "./user";

const cartSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        size_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductSize",
        },
        option_ids: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductOption",
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["in-cart", "ordered"],
            default: "in-cart",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

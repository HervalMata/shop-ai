import mongoose from "mongoose";
import Product from "./product";
import ProductSize from "./productSize";
import ProductOption from "./productOption";
import User from "./user";

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: {
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
            item_price: {
                type: Number,
                required: true,
            },
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
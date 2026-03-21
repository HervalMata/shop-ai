import mongoose from "mongoose";
import Product from "./product";
import Orders from "./orders";

const orderItemSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        product_name: {
            type: String,
            required: true,
        },
        unit_price: {
            type: Number,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            min: 1,
        },
        product_size: {
            type: Object,
            default: null,
        },
        product_option: {
            type: Object,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.modls.OrderItem || mongoose.model("OrderItem", orderItemSchema);
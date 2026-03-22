import mongoose from "mongoose";

const dailyOfferSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
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

export default mongoose.models.DailyOffer || mongoose.model("DailyOffer", dailyOfferSchema);
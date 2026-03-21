import mongoose from "mongoose";

const bannerSliderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        sub_title: {
            type: String,
            required: true,
            trim: true,
        },
        banner: {
            type: String,
            required: true,
        },
        url: {
            type: String,
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

export default mongoose.models.BannerSlider ||
    mongoose.model("BannerSlider", bannerSliderSchema);
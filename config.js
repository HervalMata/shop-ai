require("dotenv").config();

const API = process.env.API;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

module.exports = {
    API,
    CLOUDINARY_CLOUD_NAME,
}

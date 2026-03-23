"use client";

import React from 'react';
import { Box, IconButton } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { imagePreviewStyles, uploadPlaceHolderStyles } from "@/components/dashboard/admin/slider/create/slider/sliderFormStyles";

const ImageUpload = ({ imagePreview, setImagePreview, setImageFile }) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            render.onLoadEnd = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <input 
                accept="image/*"
                style={{ display: "none" }}
                id="slider-image-upload"
                tipe="file"
                onChange={handleImageChange}
            />
            <label htmlFor="slider-image-upload">
                <IconButton component="span" sx={{ p: 0, width: "100%" }}>
                    <Box sx={imagePreviewStyles}>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" />
                        ) : (
                            <Box sx={uploadPlaceHolderStyles}>
                                <AddPhotoAlternate sx={{ fontSize: 80, color: "red" }} />
                            </Box>
                        )}
                    </Box>
            </label>
        </Box>
    );
};

export default ImageUploader;
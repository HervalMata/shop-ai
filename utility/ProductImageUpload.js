"use client";

import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

const ImageUpload = ({ imagePreview, setImagePreview, setImageFile, label = "Image" }) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            alert('Por favor selecione um arquivo de imagem (jpg. png, etc.)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter pelo menos 5MB');
            return;
        }

        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

        return (
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {label}
                </Typography>
                <input 
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload-input"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="image-upload-input">
                    <IconButton component="span" sx={{ p: 0, width: "100%" }}>
                        <Box sx={{
                            width: '100%',
                            height: 300,
                            border: '2px dashed #ccc',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            backgroundColor: '#F5F5F5',
                            '&:hover': {
                                borderColor: 'red',
                            },
                        }}>
                            {imagePreview ? (
                                <img 
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    color: '#999',
                                }}>
                                    <AddPhotoAlternate sx={{ fontSize: 50, color: 'red' }}/>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Clicque aqui para carregar uma imagem
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </IconButton>
                </label>
            </Box>
        );
};


export default ImageUpload;
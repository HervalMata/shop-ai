"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress, Chip, useMediaQuery, useTheme } from "@mui/material";
import PostCard from "./PostCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeProducts } from '@/slices/productSlice';
import { fetchHomeCategories } from '@/slices/categorySlice';

export default function Listings() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { homeProducts: products, loading: productsLoading } = useSelector((state) => state.products);
    const { homeCategories: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        dispatch(fetchHomeProducts());
        dispatch(fetchHomeCategories());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.category_id?._id === selectedCategory ||
                product.category_id === selectedCategory
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, products]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <Box
            sx={{
                margin: '0 auto',
                width: '80%',
                maxWidth: '1070px',
            }}
        >
            <Box textAlign="center" mt={14} sx={{ margin: '0 auto', maxWidth: '600px', marginBottom: '60px' }} />
            <Box textAlign="center" mt={14} sx={{ margin: '0 auto', maxWidth: '600px' }}>
                <Typography
                    variant="body4"
                    gutterBottom
                    mt={14}
                    sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 600,
                        color: 'red',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)'
                    }}
                >
                    Cris Laços
                </Typography> 
                <Typography
                    variant="h4"
                    gutterBottom
                    mt={1}
                    sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 900,
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)'
                    }}
                >
                    Os melhores acessórios de cabeça do mercado
                </Typography>  
                <Typography
                    variant="body2"
                    gutterBottom
                    mb={4}
                    sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 300,
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)'
                    }}
                >
                    Escolha os melhores acessórios para você
                </Typography>     
            </Box>

            {/* Category Filter Chips */}
            <Box
                sx={{
                    dispaly: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    justifyContent: 'center',
                    mb: 4,
                    overflowX: 'auto',
                    py: 1,
                    '&:-webkit-scrollbar': {
                        height: '5px',
                    },
                    '&:-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '10px',
                    },
                }}
            >
                <Chip 
                    label="Todas"
                    onClick={() => handleCategoryClick('all')}
                    color={selectedCategory === 'all' ? 'primary' : 'default'}
                    sx={{
                        mx: 0.5,
                        fontWeight: selectedCategory === 'all' ? 'bold' : 'normal'
                    }}
                />
                {categories.map((category) => (
                    <Chip 
                        key={category._id}
                        label={category.name}
                        onClick={() => handleCategoryClick(category._id)}
                        color={selectedCategory === category._id ? 'primary' : 'default'}
                        sx={{
                            mx: 0.5,
                            fontWeight: selectedCategory === category._id ? 'bold' : 'normal'
                        }}
                    />
                ))}
            </Box>

            {/* Products Grid */}
            {productsLoading || categoriesLoading ? (
                <Box dispaly="flex" justifyContent="center" py={10}>
                    <CircularProgress />
                </Box>
            ) : filteredProducts.length === 0 ? (
                <Typography textAlign="center" py={4}>
                    Nenhum produto encontrado nesta categoria
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Gird container spacing={isMobile ? 1 : 3}>
                            {filteredProducts.map((product, index) => (
                                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                    <PostCard 
                                        post={{
                                            title: product.name,
                                            categories: product.category_id?.name || "Sem Categoria",
                                            rating: 4.5,
                                            location: '',
                                            imageUrl: product.thumb_image,
                                            price: product.offer_price
                                                ? `R$ ${product.offer_price.toLocaleString("pt-BR")} era R$ ${product.price.toLocaleString("pt-BR")}`
                                                : `R$ ${product.price.toLocaleString("pt-BR")}`,
                                            productId: product._id,
                                            product_price: product.price,
                                            product_offer_price: product.offer_price,
                                            product_slug: product?.slug,    
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Gird>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
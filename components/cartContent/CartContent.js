"use client";

import React, { useState, useEffect } from "react";
import { CartContainer, CartTitle, EmptyCart } from "./cartStyles";
import { useDispatch, useSelector } from "react-redux";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import { fetchCart, removeFromCart } from "@/slices/cartSlice";
import CartItem from "./CartItem";

const CartContent = () => {
    const dispatch = useDispatch();

    const { items: cartItems, loading, error } = useSelector((state) => state.cart);
    
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleRemoveItem = async (id) => {
        try {
            setIsAnimating(true);
            await dispatch(removeFromCart(id)).unwrap();
        } catch (error) {
            console.log("Erro removendo item", error);
        } finally {
            setIsAnimating(false);
        }
    }

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + item.totalPrice, 0)
            .toLocalString("pt-BR");
    }

    if (loading) {
        return (
            <CartContainer>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHight="200px"
                >
                    <CircularProgress />
                </Box>
            </CartContainer>
        );
    }

    if (error) {
        return (
            <CartContainer>
                <Typography color="error">{error}</Typography>
            </CartContainer>
        );
    }
    
    return (
        <CartContainer>
            <CartTitle variant="h5">Seu Carrinho de Compras</CartTitle>
            {cartItems.length === 0 ? (
                <EmptyCart>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 60, color: "text.disabled" }} />
                    <Typography variant="body1" color="textSecondary">
                        Seu Carrinho está vazio
                    </Typography>
                </EmptyCart>
            ) : (
                <>
                    <Box sx={{ maxHeight: "400px", overflowY: "auto", mb: 2 }}>
                        {cartItems.map((item) => (
                            <CartItem 
                                key={item._id}
                                item={{
                                    id: item._id,
                                    name: item.productId.name,
                                    image: item.productId.thumb_image,
                                    quantity: item.quantity,
                                    price: item.totalPrice / item.quantity,
                                    size: item.sizeId?.name,
                                    options: item.optionIds?.map((opt) =>opt.name).join(", "),
                                    totalPrice: item.totalPrice,
                                }}
                                onRemove={handleRemoveItem}
                                isAnimating={isAnimating}
                            />
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6" fontWeight="700">
                            R$ {calculateTotal().toLocalString("pt-BR")}
                        </Typography>
                    </Box>

                    <ActionButton fullWidth href="/cart">
                        Veja Carrinho
                    </ActionButton>
                    <ActionButton
                        fullWidth
                        href="/checkout"
                        sx={{
                            backgroundColor: "red",
                            "&:hover": {
                                backgroundColor: "darked"
                            },
                        }}
                    >
                        Checkout
                    </ActionButton>
                </>
            )}
        </CartContainer>
    );
};

export default CartContent;
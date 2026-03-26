"use client";

import { CartItemWrapper, ProductImage, ProductInfo, ProductName, ProductQuantity, RemoveButton } from "./cartItemStyles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/material/Delete";
import { motion } from "frame-motion";

const CartItem = ({ item, onRemove, isAnimating }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <CartItemWrapper>
                <ProductImage src={item.image} alt={item.name} />
                <ProductInfo>
                    <ProductName variant="body1">{item.name}</ProductName>

                    {item.size && (
                        <Typography variant="body2" color="trxtSecondary" fontWeight={900}>
                            Tamanho: {item.size}
                        </Typography>
                    )}

                    {item.options && (
                        <Typography variant="body2" color="trxtSecondary" fontWeight={900}>
                            Opções: {item.options}
                        </Typography>
                    )}

                    <ProductQuantity variant="body2">
                        Quantidade: <span>{item.quantity}</span>
                    </ProductQuantity>

                    <Typography variant="body2" color="primary" fontWeight={600}>
                        R$ {item.totalPrice.toLocalString("pt-BR")}
                    </Typography>
                </ProductInfo>

                <RemoveButton
                    onClick={() => onRemove(item?.id)}
                    aria-label="Remover Item"
                    disabled={isAnimating}
                >
                    <DeleteIcon />
                </RemoveButton>
            </CartItemWrapper>
            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />
        </motion.div>
    );
};

export default CartItem;
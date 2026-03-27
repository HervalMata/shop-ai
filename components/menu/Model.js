import { 
    ModelContainer, 
    CloseButton, 
    ScrollableContent, 
    ProductImage, 
    CategoryTag,
    SizeFormControl,
    QuantityBox,
    SecondaryButton,
    PrimaryButton,
    FixedFooter, 
} from "./ModelStyles";
import { 
    Typography, 
    Box, 
    Radio, 
    RadioGroup, 
    FormControlLabel, 
    FormLabel, 
    Checkbox,
    useMediaQuery,
    useTheme,
    IconButton,
    CircularProgress, 
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import React, { useState, useEffect } from "react";
import { addToCart } from "@/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "@mui/icons-material/Rating";
import CloseIcon from "@mui/icons-material/Close";

const Model = ({ product, onClose }) => {
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const productName = product?.name || product?.title || "Titulo do Produto";
    const productImage = product?.thumb_image || product?.imageUrl || "/images/res1.jpg";
    const basePrice = Number(product?.product_price) || 0;
    const offerPrice = Number(product?.product_offer_price) || null;
    const ratingValue = product?.rating || 4;
    const category = product?.categories || product?.category_id?.name || "Sem Categoria";
    const productId = product?.productId || product?._id;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.API}/product-details?product_id=${productId}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || "Falha ao carregar os detalhes do produto");
                }
                const { sizes: sizesData, options: optionsData } = await response.json();
                setSizes(sizesData);
                setOptions(optionsData);
                if (sizesData.length > 0) {
                    setSelectedSize(sizesData[0]._id);
                }
                const initialOptions = {};
                optionsData.forEach((option) => {
                    initialOptions[option._id] = false;
                });
                setSelectedOptions(initialOptions);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar os ddetalhes do produto");;
                setError(error.message);
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleOptionChange = (optionId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionId]: !prev[optionId],
        }));
    };

    const handleQuantityChange = (increment) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity - increment));
    };

    const calculateTotalPrice = () => {
        let to = basePrice;

        if (selectedSize) {
            const selectedSizeObj = sizes.find((size) => size._id === selectedSize);
            if (selectedSizeObj && typeof selectedSizeObj.price === "number") {
                total += selectedSizeObj.price;
            }
        }

        const optionsTotal = options.reduce((sum, option) => {
            if (selectedOptions[option._id] && typeof option.price === "number") {
                return sum + option.price;
            }
            return sum;
        }, 0);

        return (total + optionsTotal) * quantity;
    };

    const totalPrice = calculateTotalPrice();

    const formatPrice = (price) => {
        const num =  Number(price);
        return isNaN(num) ? "R$ 0,00" : `R$ ${num.toLocaleString("pt-BR")}`;
    };

    const handleAddToCart = async () => {
        try {
            const selectedOptionsIds = Object.keys(selectedOptions).filter(
                (id) => selectedOptions[id]
            );
            const payload = {
                productId,
                sizeId: selectedSize,
                optionIds: selectedOptions,
                quantity,
            };
            await dispatch(addToCart(payload));
            alert("✅ Produto adicionado para o carrinho com sucesso");
        } catch (error) {
            console.error(error);
            alert("❌ Falha ao adicionar produto ao carrinho");
        }
    };

    if (loading) {
        return (
            <ModelContainer>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <CircularProgress />
                </Box>
            </ModelContainer>
        );
    }

    if (error) {
        return (
            <ModelContainer>
                <CloseButton onClick={onClose}>
                    <CloseIcon />
                </CloseButton>
                <Typography color="error" sx={{ p: 3 }}>
                    Erro: {error}
                </Typography>
            </ModelContainer>
        );
    }

    return (
        <ModelContainer>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>

            <ScrollableContent>
                <ProductImage src={productImage} alt={productName} />
                <CategoryTag label={category} />

                <Box sx={{ mt: 2 }}>
                    <Typography veriant={isSmallScreen ? "h6" : "h5"} component="div">
                        {productName}
                    </Typography>

                    <Rating 
                        name="product-rating"
                        value={ratingValue}
                        readOnly
                        size={isSmallScreen ? "small" : "medium"}
                        sx={{ my: 1 }}
                    />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {offerPrice ? (
                            <>
                                <Typography
                                    veriant="h6"
                                    color="text.secondary"
                                    sx={{ textDecoration: "line-through" }}
                                >
                                    {formatPrice(basePrice)}
                                </Typography>
                                <Typography veriant="h6" color="error">
                                    {formatPrice(offerPrice)}
                                </Typography>
                            </>
                        ) : (
                            <Typography veriant="h6" color="text.primary">
                                {formatPrice(basePrice)}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {sizes.length > 0 && (
                    <SizeFormControl component="fieldset" sx={{ mt: 3 }}>
                        <FormLabel component="legend">Tamanho</FormLabel>
                        <RadioGroup
                            aria-label="size"
                            name="size"
                            value={selectedSize || ""}
                            onChange={handleSizeChange}
                        >
                            {sizes.map((size) => (
                                <FormControlLabel 
                                    key={size._id}
                                    value={size._id}
                                    control={
                                        <Radio 
                                            size={isSmallScreen ? "small" : "medium"}
                                            sx={{
                                                color: theme.palette.error.main,
                                                "&.Mui-checked": { color: theme.palette.error.main }
                                            }}
                                        />
                                    }
                                    label={`${size.name} (${formatPrice(size.price)})`}
                                />
                            ))}
                        </RadioGroup>
                    </SizeFormControl>
                )}

                {options.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <FormLabel component="legend">Opções</FormLabel>
                        {options.map((option) => (
                            <FormControlLabel 
                                key={option._id}
                                control={
                                    <Checkbox 
                                        size={isSmallScreen ? "small" : "medium"}
                                        sx={{
                                            color: theme.palette.error.main,
                                                "&.Mui-checked": { color: theme.palette.error.main }
                                        }}
                                        checked={selectedOptions[option._id] || false}
                                        onChange={() => handleOptionChange(option._id)}
                                        name={option._id}
                                    />
                                }
                                label={`${option.name} (${formatPrice(option.price)})`}
                            />
                        ))}
                    </Box>
                )}

                <QuantityBox sx={{ mt: 3 }}>
                    <Typography veriant="body1">Quantidade</Typography>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            onClick={() => handleQuantityChange(-1)}
                            size={isSmallScreen ? "small" : "medium"}
                            sx={{ color: theme.palette.error.main }}
                        >
                            <RemoveIcon fontSize={isSmallScreen ? "small" : "medium"} />
                        </IconButton>
                        <Typography veriant="body1" sx={{ mx: 2 }}>
                            {quantity}
                        </Typography>
                        <IconButton
                            onClick={() => handleQuantityChange(1)}
                            size={isSmallScreen ? "small" : "medium"}
                            sx={{ color: theme.palette.error.main }}
                        >
                            <AddIcon fontSize={isSmallScreen ? "small" : "medium"} />
                        </IconButton>
                    </Box>
                </QuantityBox>

                <Typography
                    veriant={isSmallScreen ? "h6" : "h5"}
                    sx={{
                        mt: 3,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: theme.palette.main,
                    }}
                >
                    Total: {formatPrice(totalPrice)}
                </Typography>
            </ScrollableContent>

            <FixedFooter>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <SecondaryButton veriant="outlined" fullWidth>
                        Adicionar para Lista de Desejos
                    </SecondaryButton>
                    <PrimaryButton
                        veriant="contained"
                        fullWidth
                        onClick={handleAddToCart}
                    >
                        Aadicionar para o carrinho
                    </PrimaryButton>
                </Box>
            </FixedFooter>
        </ModelContainer>
    );
}

export default Model;
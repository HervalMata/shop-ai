import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//Add To Cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (payload, { dispatch }) => {
        try {
            const response = await fetch(`${process.env.API}/user/add-to-cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || `Falha ao adicionar para o carrinho: `);
            }
            toast.success("Item adicionado para carrinho com sucesso!");
            dispatch(fetchCart());
            return data;
        } catch (error) {
            toast.error(`Erro ao adicionar para o carrinho: ${error.message}`);
            throw error;
        }
    }
);

// Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    try {
        const res = await fetch(`${process.env.API}/user/add-to-cart`);
        const data  = await res.json();
        if (!res.ok) throw new Error("Falha ao carregar o carrinho");
        return data;
    } catch (error) {
        console.log("Falha ao carregar o carrinho de compras", error);
        toast.error(error.message);
        throw error;
    }
});

//delete existing Cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (itemId, { dispatch }) => {
        try {
            const response = await fetch(`${process.env.API}/user/cart/${itemId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover item do carrinho: ${response.status}`);
            }
            toast.success("Item removido do carrinho com sucesso!");
            dispatch(fetchCart());
            return itemId;
        } catch (error) {
            toast.error(`error.message`);
            throw error;
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
            toast.success("Carrinho limpo com sucesso!");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

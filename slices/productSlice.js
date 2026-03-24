import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single Product by Id
export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/products/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar Produto: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar Produto: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all Products (admin)
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/products`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Produtos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Produtos: ${error.message}`);
            throw error;
        }
    }
);

//Fetch Products for home page
export const fetchHomeProducts = createAsyncThunk(
    "products/fetchHomeProducts",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/Products/`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Produtos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Produtos: ${error.message}`);
            throw error;
        }
    }
);

//create new Product
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (productData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Produto: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Produto criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Produto: ${error.message}`);
            throw error;
        }
    }
);

//update existing Product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({id, productData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Produto: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Produto atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Produto: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Produto: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Produto removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Produto: ${error.message}`);
            throw error;
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        loading: false,
        error: null,
        homeProducts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchHomeProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchHomeProducts.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default productSlice.reducer;
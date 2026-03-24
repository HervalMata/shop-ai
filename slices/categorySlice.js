import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single Category by Id
export const fetchCategoryById = createAsyncThunk(
    "categories/fetchCategoryById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/categories/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar Categoria: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar Categoria: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all Categorys (admin)
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/categories`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar as Categorias: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar as Categorias: ${error.message}`);
            throw error;
        }
    }
);

//Fetch Categories for home page
export const fetchHomeCategories = createAsyncThunk(
    "categories/fetchHomeCategories",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/categories/`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar as Categorias: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar as Categorias: ${error.message}`);
            throw error;
        }
    }
);

//create new Category
export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (categoryData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Categoria: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Categoria criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Categoria: ${error.message}`);
            throw error;
        }
    }
);

//update existing Category
export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({id, categoryData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Categoria: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Categoria atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Categoria: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Category
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/categories/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Categoria: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Categoria removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Categoria: ${error.message}`);
            throw error;
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        loading: false,
        error: null,
        homeCategories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchHomeCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchHomeCategories.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default categorySlice.reducer;
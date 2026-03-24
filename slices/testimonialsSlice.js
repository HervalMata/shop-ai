import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single Testimonial by Id
export const fetchTestimonialById = createAsyncThunk(
    "testimonials/fetchTestimonialById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/testimonials/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar testemunho: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar testemunho: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all Testimonials (admin)
export const fetchTestimonials = createAsyncThunk(
    "testimonials/fetchTestimonials",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/testimonials`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Testemunhos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Testemunhos: ${error.message}`);
            throw error;
        }
    }
);

//Fetch Testimonials for home page
export const fetchHomeTestimonials = createAsyncThunk(
    "testimonials/fetchHomeTestimonials",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/testimonials/`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Testemunhos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Testemunhos: ${error.message}`);
            throw error;
        }
    }
);

//create new Testimonial
export const createTestimonial = createAsyncThunk(
    "testimonials/createTestimonial",
    async (testimonialData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/testimonials`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testimonialData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Testemunho: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Testemunho criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Testemunho: ${error.message}`);
            throw error;
        }
    }
);

//update existing Testimonial
export const updateTestimonial = createAsyncThunk(
    "testimonials/updateTestimonial",
    async ({id, testimonialData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/testimonials/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testimonialData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Testemunho: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Testemunho atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Testemunho: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Testimonial
export const deleteTestimonial = createAsyncThunk(
    "testimonials/deleteTestimonial",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/testimonials/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Testemunho: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Testemunho removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Testemunho: ${error.message}`);
            throw error;
        }
    }
);

const testimonialSlice = createSlice({
    name: "testimonials",
    initialState: {
        list: [],
        loading: false,
        error: null,
        homeTestemonials: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTestimonial.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTestimonial.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createTestimonial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchTestimonials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchHomeTestimonials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeTestimonials.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchHomeTestimonials.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateTestimonial.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateTestimonial.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteTestimonial.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteTestimonial.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchTestimonialById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestimonialById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchTestimonialById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default testimonialSlice.reducer;
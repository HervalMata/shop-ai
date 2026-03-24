import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single Slider by Id
export const fetchSliderById = createAsyncThunk(
    "sliders/fetchSliderById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/sliders/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar Slider: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar Slider: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all Sliders (admin)
export const fetchSliders = createAsyncThunk(
    "sliders/fetchSliders",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/sliders`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Sliders: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Sliders: ${error.message}`);
            throw error;
        }
    }
);

//Fetch Sliders for home page
export const fetchHomeSliders = createAsyncThunk(
    "sliders/fetchHomeSliders",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/sliders/`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Sliders: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Sliders: ${error.message}`);
            throw error;
        }
    }
);

//create new Slider
export const createSlider = createAsyncThunk(
    "sliders/createSlider",
    async (sliderData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/sliders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sliderData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Slider: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Slider criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Slider: ${error.message}`);
            throw error;
        }
    }
);

//update existing Slider
export const updateSlider = createAsyncThunk(
    "sliders/updateSlider",
    async ({id, sliderData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/sliders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sliderData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Produto: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Slider atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Slider: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Slider
export const deleteSlider = createAsyncThunk(
    "sliders/deleteSlider",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/sliders/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Slider: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Slider removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Slider: ${error.message}`);
            throw error;
        }
    }
);

const sliderSlice = createSlice({
    name: "sliders",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSlider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchSliders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSliders.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchSliders.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchHomeSliders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeSliders.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchHomeSliders.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateSlider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSlider.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateSlider.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteSlider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteSlider.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchSliderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSliderById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchSliderById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default sliderSlice.reducer;
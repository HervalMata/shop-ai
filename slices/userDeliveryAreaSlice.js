import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch all DeliveryAreas
export const fetchDeliveryAreas = createAsyncThunk(
    "userDeliveryAreas/fetchDeliveryAreas",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/user/delivery-areas`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar as Áreas de entrega: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar as Áreas de entrega: ${error.message}`);
            throw error;
        }
    }
);

const userDeliveryAreasSlice = createSlice({
    name: "userDeliveryAreas",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDeliveryAreas.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDeliveryAreas.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchDeliveryAreas.rejected, (state, action) => {
            state.loading = false;
           state.error = action.error.mesage;
        })
    },
});

export default userDeliveryAreasSlice.reducer;
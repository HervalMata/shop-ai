import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single DeliveryArea by Id
export const fetchDeliveryAreaById = createAsyncThunk(
    "deliveryAreas/fetchDeliveryAreaById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/delivery-areas/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar Àrea de Entrega: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar Área de entrega: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all DeliveryAreas
export const fetchDeliveryAreas = createAsyncThunk(
    "deliveryAreas/fetchDeliveryAreas",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/delivery-areas`);
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

//create new DeliveryArea
export const createDeliveryArea = createAsyncThunk(
    "deliveryAreas/createDeliveryArea",
    async (areaData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/delivery-areas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(areaData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Área de entrega: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Área de entrega criada com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Área de entrega: ${error.message}`);
            throw error;
        }
    }
);

//update existing DeliveryArea
export const updateDeliveryArea = createAsyncThunk(
    "deliveryAreas/updateDeliveryArea",
    async ({id, areaData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/delivery-areas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(areaData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Área de entrega: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Área de entrega atualizada com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Área de entrega: ${error.message}`);
            throw error;
        }
    }
);

//delete existing DeliveryArea
export const deleteDeliveryArea = createAsyncThunk(
    "deliveryAreas/deleteDeliveryArea",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/delivery-areas/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Área de entrega: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Área de entrega removida com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Área de entrega: ${error.message}`);
            throw error;
        }
    }
);

const deliveryAreaSlice = createSlice({
    name: "deliveryAreas",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDeliveryArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDeliveryArea.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createDeliveryArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchDeliveryAreas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveryAreas.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchDeliveryAreas.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateDeliveryArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDeliveryArea.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateDeliveryArea.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteDeliveryArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDeliveryArea.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteDeliveryArea.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchDeliveryAreaById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveryAreaById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchDeliveryAreaById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default deliveryAreaSlice.reducer;
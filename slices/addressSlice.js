import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single address by Id
export const fetchAddressById = createAsyncThunk(
    "addresses/fetchAddressById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/user/addresses/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar endereço: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar endereço: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all addresses
export const fetchAddress = createAsyncThunk(
    "addresses/fetchAddress",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/user/addresses`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os endereço: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os endereço: ${error.message}`);
            throw error;
        }
    }
);

//create new address
export const createAddress = createAsyncThunk(
    "addresses/createAddress",
    async (addressData) => {
        try {
            const response = await fetch(`${process.env.API}/user/addresses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addressData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar endereço: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Endereço criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar endereço: ${error.message}`);
            throw error;
        }
    }
);

//update existing address
export const updateAddress = createAsyncThunk(
    "addresses/updateAddress",
    async ({id, addressData}) => {
        try {
            const response = await fetch(`${process.env.API}/user/addresses/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addressData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar endereço: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Endereço atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar endereço: ${error.message}`);
            throw error;
        }
    }
);

//delete existing address
export const deleteAddress = createAsyncThunk(
    "addresses/deleteAddress",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/user/addresses/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover endereço: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Endereço removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover endereço: ${error.message}`);
            throw error;
        }
    }
);

const addressSlice = createSlice({
    name: "addresses",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchAddressById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddressById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchAddressById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default addressSlice.reducer;
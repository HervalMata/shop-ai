import { createSlice, createAsayncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single Coupon by Id
export const fetchCouponById = createAsayncThunk(
    "coupons/fetchCouponById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/coupons/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar Cupom: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar Cupom: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all Coupons (admin)
export const fetchCoupons = createAsayncThunk(
    "coupons/fetchCoupons",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/coupons`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar as Cupons: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar as Cupons: ${error.message}`);
            throw error;
        }
    }
);

//Fetch Active Coupons for customers
export const fetchActiveCoupons = createAsayncThunk(
    "coupons/fetchActiveCoupons",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/coupons`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Cupons ativos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar as Cupons: ${error.message}`);
            throw error;
        }
    }
);

//create new Coupon
export const createCoupon = createAsayncThunk(
    "coupons/createCoupon",
    async (couponData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/coupons`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(couponData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Cupom: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Cupom criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Cupom: ${error.message}`);
            throw error;
        }
    }
);

//update existing Coupon
export const updateCoupon = createAsayncThunk(
    "coupons/updateCoupon",
    async ({id, couponData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/coupons/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(couponData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Cupom: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Cupom atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Cupom: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Coupon
export const deleteCoupon = createAsayncThunk(
    "coupons/deleteCoupon",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/coupons/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Cupom: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Cupom removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Cupom: ${error.message}`);
            throw error;
        }
    }
);

// Validate coupon code
export const validateCoupon = createAsayncThunk(
    "coupons/validateCoupon",
    async (code) => {
        try {
            const response = await fetch(`${process.env.API}/coupons/validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(code),
            });
            if (!response.ok) {
                throw new Error(`Falha ao validar Cupom: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao validar Cupom: ${error.message}`);
            throw error;
        }
    }
);

const couponSlice = createSlice({
    name: "coupons",
    initialState: {
        list: [],
        loading: false,
        error: null,
        ActiveCoupons: [],
        validatedCoupon: null,
    },
    reducers: {
        clearValidatedCoupon: (state) => {
            state.validateCoupon = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchActiveCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchActiveCoupons.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchCouponById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCouponById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchCouponById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(validateCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.validatedCoupon = action.payload;
            })
            .addCase(validateCoupon.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
                state.validatedCoupon = null;
            })
    },
});

export const { clearValidatedCoupon } = couponSlice.actions;
export default couponSlice.reducer;
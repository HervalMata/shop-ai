import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single banner by Id
export const fetchBannerById = createAsyncThunk(
    "banners/fetchBannerById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/banners/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar banner: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar banner: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all banners (admin)
export const fetchBanners = createAsyncThunk(
    "banners/fetchBanners",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/banners`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os banners: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os banners: ${error.message}`);
            throw error;
        }
    }
);

//Fetch banners for home page
export const fetchHomeBanners = createAsyncThunk(
    "banners/fetchHomeBanners",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/banners/`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os banners: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os banners: ${error.message}`);
            throw error;
        }
    }
);

//create new Banner
export const createBanner = createAsyncThunk(
    "banners/createBanner",
    async (bannerData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/banners`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bannerData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar banner: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Banner criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar banner: ${error.message}`);
            throw error;
        }
    }
);

//update existing Banner
export const updateBanner = createAsyncThunk(
    "banners/updateBanner",
    async ({id, bannerData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/banners/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bannerData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar banner: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Banner atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar banner: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Banner
export const deleteBanner = createAsyncThunk(
    "banners/deleteBanner",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/banners/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover banner: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Banner removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover banner: ${error.message}`);
            throw error;
        }
    }
);

const bannerSlice = createSlice({
    name: "banners",
    initialState: {
        list: [],
        loading: false,
        error: null,
        homeBanners: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchHomeBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchHomeBanners.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBanner.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateBanner.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchBannerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBannerById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchBannerById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default bannerSlice.reducer;
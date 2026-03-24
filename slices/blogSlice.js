import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Fetch single Blog by Id
export const fetchBlogById = createAsyncThunk(
    "blogs/fetchBlogById",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/blogs/${id}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar Blog: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar Blog: ${error.message}`);
            throw error;
        }
    }
);

//Fetch all Blogs (admin)
export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/blogs`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Blogs: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Blogs: ${error.message}`);
            throw error;
        }
    }
);

//Fetch Blogs for home page
export const fetchHomeBlogs = createAsyncThunk(
    "blogs/fetchHomeBlogs",
    async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/blogs/`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar os Blogs: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            toast.error(`Erro ao carregar os Blogs: ${error.message}`);
            throw error;
        }
    }
);

//create new Blog
export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (blogData) => {
        try {
            const response = await fetch(`${process.env.API}/admin/blogs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao criar Blog: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Blog criado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao criar Blog: ${error.message}`);
            throw error;
        }
    }
);

//update existing Blog
export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async ({id, blogData}) => {
        try {
            const response = await fetch(`${process.env.API}/admin/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData),
            });
            if (!response.ok) {
                throw new Error(`Falha ao atualizar Blog: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Blog atualizado com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao atualizar Blog: ${error.message}`);
            throw error;
        }
    }
);

//delete existing Blog
export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (id) => {
        try {
            const response = await fetch(`${process.env.API}/admin/blogs/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Falha ao remover Blog: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Blog removido com sucesso!");
            return data;
        } catch (error) {
            toast.error(`Erro ao remover Blog: ${error.message}`);
            throw error;
        }
    }
);

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        list: [],
        loading: false,
        error: null,
        homeBlogs: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.mesage;
            })
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchHomeBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(fetchHomeBlogs.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
            .addCase(fetchBlogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.loading = false;
                state.lerror = action.error.mesage;
            })
    },
});

export default blogSlice.reducer;
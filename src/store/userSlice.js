import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addToCart,
    authUser,
    getCartItems,
    loginUser,
    logoutUser,
    payProducts,
    registerUser,
    removeCartItem,
} from "./thunkFunctions";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";

const initialState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        image: "",
        cart: [],
    },
    isAuth: false,
    isLoading: false,
    error: "",
    cartDetail: [],
};

export const fetchUserCart = createAsyncThunk(
    "user/fetchUserCart",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/users/cart");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                toast.info("会員登録に成功しました。");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.userData = action.payload;
                state.userData = action.payload.user;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
            })

            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData.cart = action.payload;
                toast.info("カートに追加されました。");
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = action.payload.productInfo;
                state.userData.cart = action.payload.cart;
                toast.info("商品がカートから削除されました。");
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(payProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(payProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = [];
                state.userData.cart = [];
                toast.info("商品を正常に購入しました。");
            })
            .addCase(payProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(fetchUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                if (state.userData) {
                    state.userData.cart = JSON.parse(
                        JSON.stringify(action.payload.cart)
                    );
                }
                state.cartDetail = JSON.parse(
                    JSON.stringify(action.payload.cartDetail)
                );
                state.loading = false;
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (accessToken) => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/cart', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data.data.cartDetails;
        } catch (error) {
            localStorage.setItem('cartItems', JSON.stringify([]));
            throw error;
        }
    }
);
export const addToCartApi = createAsyncThunk(
    'cart/addToCartApi',
    async ({ courseId, accessToken }, { dispatch }) => {
        await axios.post('http://localhost:8080/api/v1/cart', { courseId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return dispatch(fetchCartItems(accessToken));
    }
);

export const removeFromCartApi = createAsyncThunk(
    'cart/removeFromCartApi',
    async ({ courseId, accessToken }) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/cart?courseId=${courseId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data.data.cartDetails;
        }catch(error){
            localStorage.setItem('cartItems', JSON.stringify([]));
            throw error;
        }
       
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        status: 'idle',
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems');
        },
        updateCartItems: (state, action) => {
            state.items = action.payload;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.items = action.payload;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
                state.status = 'succeeded';
            })
            .addCase(fetchCartItems.rejected, (state,action) => {
                state.items = action.payload;
                localStorage.setItem('cartItems', JSON.stringify([]));
                state.status = 'failed';
            })
            .addCase(addToCartApi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartApi.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addToCartApi.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(removeFromCartApi.fulfilled, (state, action) => {
                state.items = action.payload;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            })
            .addCase(removeFromCartApi.rejected, (state, action) => {
                state.items = action.payload;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            });
    },
});

export const { clearCart, updateCartItems } = cartSlice.actions;
export default cartSlice.reducer;
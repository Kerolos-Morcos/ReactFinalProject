import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from 'js-cookie';

// const token = 'your-authentication-token';
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// export const addToCart=createAsyncThunk('cartSlice/addToCart',async () =>{
//     try{
//     const response=await axios.get("http://localhost:3500/device/cart/add/");
//    console.log(response.data.data);
//     return response.data.data;
//    }
//     catch(err){
//         console.log(err);
//     }
// })


import jwtDecode from "jwt-decode";

export const addToCart = createAsyncThunk(
    "cartSlice/addToCart",
    async (productId, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const patientId = decoded.userid;
            const response = await axios.post(
                `http://localhost:3500/device/cart/add/${productId}?patientId=${patientId}`,
                null, // pass a null body parameter to the post request why i do that here
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            // console.log(response.data);
            return response.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getAllCartProduct = createAsyncThunk('cartSlice/getAllCartProduct', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;

        const response = await axios.get(`http://localhost:3500/device/cart?patientId=${patientId}`,
            {
                headers: { authorization: `Bearer ${token}` },
            });
        //    console.log(response.data.data);
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
})

export const deleteFromCart = createAsyncThunk('cartSlice/deleteFormCart', async (itemId, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const patientId = decoded.userid;

        const response = await axios.delete(`http://localhost:3500/device/cart/remove/${itemId}?patientId=${patientId}`,
            {
                headers: { authorization: `Bearer ${token}` }
            });
        // console.log(response.data);
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
})

export const emptyFromCart = createAsyncThunk('cartSlice/emptyFormCart', async () => {
    try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
        const response = await axios.delete(`http://localhost:3500/device/cart/empty?patientId=${patientId}`,
        {
            headers: { authorization: `Bearer ${token}` }}
        );
        //    console.log(response.data);
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
})

export const addQuantity = createAsyncThunk('cartSlice/addQuantity', async (productId) => {
    try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
        const response = await axios.put(`http://localhost:3500/device/addQCart/${productId}?patientId=${patientId}`,{},
        {
            headers: { authorization: `Bearer ${token}` }}
        );
        // console.log(response);
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
});

export const minusQuantity = createAsyncThunk('cartSlice/minusQuantity', async (productId) => {
    try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
        
        const response = await axios.put(`http://localhost:3500/device/minusQCart/${productId}?patientId=${patientId}`,{},
        {
            headers: { authorization: `Bearer ${token}` }}
        );
        //    console.log(response.data);
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
})



const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {

    },
    extraReducers: {
        [addToCart.pending]: (state, action) => {
            console.log("pending");
        },
        [addToCart.fulfilled]: (state, action) => {
            console.log("fulfilled");
            state.cart = action.payload;
        },
        [addToCart.rejected]: (state, action) => {
            console.log("rejected");

        },
        [getAllCartProduct.pending]: (state, action) => {
            console.log("pending");

        },
        [getAllCartProduct.fulfilled]: (state, action) => {
            console.log("fulfilled");
            // console.log(action.payload);
            state.cart = action.payload;
            // console.log(state.cart);
            // return state.cart

        },
        [getAllCartProduct.rejected]: (state, action) => {
            console.log("rejected");

        },
        [deleteFromCart.pending]: (state, action) => {
            console.log("pending");

        },
        [deleteFromCart.fulfilled]: (state, action) => {
            // remove all deleted devices from the cart array
            // console.log(action.payload);
            state.cart=action.payload
            //     state.cart = state.cart.filter(
            //       (device) => device._id !== action.payload._id
            //    );
        },
        [deleteFromCart.rejected]: (state, action) => {
            console.log("rejected");

        },
        [emptyFromCart.pending]: (state, action) => {
            console.log("pending");

        },
        [emptyFromCart.fulfilled]: (state, action) => {
            // remove all deleted devices from the cart array
            // console.log(action.payload);
            state.cart = [];
        },
        [emptyFromCart.rejected]: (state, action) => {
            console.log("rejected");

        },
        [addQuantity.pending]: (state, action) => {
            console.log("pending");
        },
        [addQuantity.fulfilled]: (state, action) => {
            // remove all deleted devices from the cart array
            // console.log(action.payload);
            state.cart=action.payload;

        },
        [addQuantity.rejected]: (state, action) => {
            console.log("rejected");
        },
        [minusQuantity.pending]: (state, action) => {
            console.log("pending");
        },
        [minusQuantity.fulfilled]: (state, action) => {
            state.cart=action.payload;
        },
        [minusQuantity.rejected]: (state, action) => {
            console.log("rejected");
        },
        

    },
})


// export const { addtoCart } = CartSlice.actions;
export default CartSlice.reducer;
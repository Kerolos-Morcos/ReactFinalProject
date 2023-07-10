import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";


export const checkOutOrder = createAsyncThunk(
    "OrderSlice/checkOutOrder",
    async (orderId, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const patientId = decoded.userid;
            const response = await axios.put(
                `http://localhost:3500/order/${orderId}?patientId=${patientId}`,
                {patientStatus:"قيد التقدم"},
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




const OrderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
    },
    reducers: {

    },
    extraReducers: {
        [checkOutOrder.pending]: (state, action) => {
            console.log("pending");
        },
        [checkOutOrder.fulfilled]: (state, action) => {
            // remove all deleted devices from the cart array
            // console.log(action.payload);
            state.order=action.payload;

        },
        [checkOutOrder.rejected]: (state, action) => {
            console.log("rejected");
        },

    },
})


// export const { addtoCart } = CartSlice.actions;
export default OrderSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getDevices = createAsyncThunk("devices/getDevice", async () => {
    try {
        let res = await axios.get('http://localhost:3500/device/getdevices')
        // console.log(res.data.data);  
        return res.data.data
    }
    catch (err) {
        console.log(err);
    }
})

// Hany
export const getDeviceById=createAsyncThunk('DeviceSlice/getDeviceById',async (itemId) =>{
    try{
    const response=await axios.get(`http://localhost:3500/device/getdevice/${itemId}`);
   console.log(response.data);
    return response.data.data;
   }
    catch(err){
        console.log(err);
    }
})

// export const addDevice = createAsyncThunk("devices/addDevice",async (payload)=>{
//     try{
//         await axios.post('http://localhost:3500/device/addDevice', payload)
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

const DeviceSlice = createSlice({
    name: "device",
    initialState: {
        // Hany
        // device: {},
        // Hany
        devices: [],
        filteredDevices: [],
        filteredArr: [],
        department: [],
        evaluate: [],
    },
    reducers: {
        // addToCart: (state, action) => {
        //     state.cart.push(action.payload)
        //     console.log("Added");
        // },
        search: (state, action) => {
            // console.log(action.payload);
            if (action.payload === "") {
                state.filteredDevices = [...state.devices]
            }
            else {
                state.filteredDevices = state.devices.filter(item => item.name.toLowerCase().includes(action.payload) || item.category.toLowerCase().includes(action.payload))
            }
        },

        departmentFilter: (state, action) => {
            // console.log(action.payload);
            let n = parseInt(action.payload.name);
            // let num = n + 1;
            // if(n === 5){
                if (action.payload.checks === false) {
                    state.filteredArr = state.filteredArr.filter(d => d.rate !== n)
                    
                    // state.filteredArr = state.filteredDevices.filter(de => de.rate !== n)
                }
                else if (action.payload.checks === true) {
                state.department = state.devices.filter((device) => device.rate === n);
                state.department.map((dev) => {
                    state.filteredArr.push(dev);
                });
            }
            // }
            // else{
            //     state.filteredArr = state.devices.filter((device) => device.rate === n );
            //     state.filteredArr = state.devices.filter((device) => device.rate << num );
            // }
        },

        evaluteFilter: (state, action)=>{
            if (action.payload.statuss === false) {
                state.filteredArr = state.filteredArr.filter(d => d.category !== action.payload.name)
                
                // state.filteredArr = state.filteredDevices.filter(de => de.rate !== n)
            }
            else if (action.payload.statuss === true && action.payload.name === 'أمراض أخرى') {
                state.evaluate = state.devices.filter((device) => device.category !== 'عظام' && device.category !== 'أمراض القلب');
                state.evaluate.map((dev) => {
                    state.filteredArr.push(dev);
                });
                console.log(action.payload.name);
            }
            else if (action.payload.statuss === true) {
                state.evaluate = state.devices.filter((device) => device.category === action.payload.name);
                state.evaluate.map((dev) => {
                    state.filteredArr.push(dev);
                });
            }
        },

        filterSubmit: (state) => {
                state.filteredDevices = [...state.filteredArr]
        },
        filterCancel: (state) => {
            state.filteredDevices = [...state.devices];
        },

        // removeFromCart: (state, action) => {
        //     state.cart = state.cart.filter(item => item.id !== action.payload)
        //     console.log(state.cart);
        // },
        // increaseCart: (state, action) => {
        //     let index = state.cart.findIndex(prd => prd.id === action.payload.id)
        //     state.cart[index].qt += 1
        //     state.cart[index].tot = state.cart[index].price * state.cart[index].qt
        // },
        // decreaseCart: (state, action) => {
        //     let index = state.cart.findIndex((item) => item.id === action.payload.id)
        //     state.cart[index].qt -= 1
        //     state.cart[index].tot = state.cart[index].price * state.cart[index].qt
        // }
    },
    extraReducers: {
        [getDevices.pending]: (state) => {
            // console.log("pending");
        },
        [getDevices.fulfilled]: (state, action) => {
            state.devices = action.payload;
            state.filteredDevices = action.payload;
        },
        [getDevices.rejected]: (state) => {
            console.log("rejected");
        },
        

        // Hany
        [getDeviceById.pending]:(state,action)=>{
            console.log("pending");
            
        },
        [getDeviceById.fulfilled]:(state,action)=>{
            console.log("fulfilled");
            // console.log(action.payload);
            state.device = action.payload;
            // console.log(state.cart);
            // return state.cart
            
        },
        [getDeviceById.rejected]:(state,action)=>{
            console.log("rejected");
            
        },
    }
}
)
export default DeviceSlice.reducer
export const { search, departmentFilter, filterSubmit, filterCancel, evaluteFilter } = DeviceSlice.actions
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// getAllProducts => action sync or async

export const getAllNurses = createAsyncThunk("nurse/getNurses", async () => {
    try {
        let res = await axios.get('http://localhost:3500/nurse/getNurses');

        return res.data.data;

    }
    catch (err) {
        console.log(err)

    }

})




// // Kerolos
// export const getTopRated = createAsyncThunk("nurse/top-rated", async () => {
//     try {
//         let res = await axios.get('http://localhost:3500/nurse/top-rated');
//         return res.data.data;
//     }
//     catch (err) {
//         console.log(err)
//     }
// })




const NurseSlice = createSlice({
    name: 'nurse',
    initialState: {
        nurses: [],
        filteredNerses: [],
      
    },
    reducers: {
       search: (state, action) => {
        if (action.payload === "") {
            state.filteredNerses = [...state.nurses]
        }
        else {
            state.filteredNerses = state.nurses.filter(nurse => nurse.name.includes(action.payload));
            console.log(action.payload);
        }
    },
    filter:(state , action) => {
     console.log(action.payload);
     state.filteredNerses = action.payload;
    //     {
    //         state.nurses.map((item1) => {
    //         state.filteredNerses = action.payload.find((item2) => item2.id === item1.id);
    //     }
    //     )
    // }
    }
},
    extraReducers: {
        [getAllNurses.pending]: (state) => {
            console.log("pending");
        },
        [getAllNurses.fulfilled]: (state, action) => {
            state.nurses = action.payload;
            state.filteredNerses = action.payload;
            // console.log( state.filteredNerses)
        },
        [getAllNurses.rejected]: (state, action) => {
            // console.log(action);
            console.log("rejected")
        },


        // // Kerolos
        // [getTopRated.pending]: (state) => {
        //     console.log("pending");
        // },
        // [getTopRated.fulfilled]: (state, action) => {
        //     state.nurses = action.payload;
        //     state.filteredNerses = action.payload;
        // },
        // [getTopRated.rejected]: (state, action) => {
        //     console.log("rejected")
        // },

        /////////////////////////////
        // [filterNurses.fulfilled]: (state, action) => {
        //     console.log(action.payload)
        //     state.filteredNerses = action.payload;
        //     console.log( state.filteredNerses)
        // }



    }
})


export default NurseSlice.reducer;
export const { addnurse, search , filter } = NurseSlice.actions;
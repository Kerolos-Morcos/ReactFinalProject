import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
// export const getPatient  = createAsyncThunk("patient/getPatient", async () => {
//     try {
//         let res = await axios.get('http://localhost:3500/patient/patientProfile')
//         console.log(res.data);
//         // return res.data.data;
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

export const getPatient = createAsyncThunk (
  "patient/getPatient",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
    //   console.log(decoded);
      const patientId = decoded.userid;
    //  console.log(patientId);
      const response = await axios.get(
        `http://localhost:3500/patient/patientProfile?patientId=${patientId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      // console.log(response);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
////
export const updatePatientInfo = createAsyncThunk(
  "patient/updatePatientInfo",
  async (
    values, 
    { rejectWithValue }
  ) => {
    try {
      alert();
      // console.log(values);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const patientId = decoded.userid;
      // console.log(values);
      const response = await axios.put(
        `http://localhost:3500/patient/editPatientProf/${patientId}`,
        values
      );
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Kerolos
export const getNurseById=createAsyncThunk('PatientSlice/getNurseById',async (NurseProfileId) =>{
  try{
  const response = await axios.get(`http://localhost:3500/nurse/nurseProfile/${NurseProfileId}`);
//  console.log(response.data.data);
  return response.data.data;
 }
  catch(err){
      console.log(err);
  }
})

// Hany
export const getBookindNurse=createAsyncThunk('PatientSlice/getBookindNurse',async (NurseProfileId) =>{
  try{
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const patientId = decoded.userid;
  const response = await axios.get(`http://localhost:3500/book/Nursebooking?patientId=${patientId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
//  console.log(response.data.data);
  return response.data.data;
 }
  catch(err){
      console.log(err);
  }
})

const PatientSlice = createSlice({
    name: 'patient',
    initialState: {
        patient: [],
        booking:[],
    },
    reducers: {
    //    addnurse:(state,action)=>{

    //    }

    },
    extraReducers: {
        [getPatient.pending]: (state) => {
            console.log("pending");
        },
        [getPatient.fulfilled]: (state, action) => {
            console.log("fulfilled")
          
            state.patient = action.payload;
            // console.log( state.patientes)
        },
        [getPatient.rejected]: (state) => {
            // console.log(action);
            console.log("rejected")
        },

        
        // Kerolos
        [getNurseById.pending]:(state,action)=>{
          console.log("pending");
          
      },
      [getNurseById.fulfilled]:(state,action)=>{
          console.log("fulfilled");
          // console.log(action.payload);
          state.device = action.payload;
          // console.log(state.cart);
          // return state.cart
          
      },
      [getNurseById.rejected]:(state,action)=>{
          console.log("rejected");
          
      },


      // Hany
      [getBookindNurse.pending]:(state,action)=>{
        console.log("pending");
        
    },
    [getBookindNurse.fulfilled]:(state,action)=>{
        console.log("fulfilled");
        // console.log(action.payload);
        state.booking = action.payload;
        // console.log(state.cart);
        // return state.cart
        
    },
    [getBookindNurse.rejected]:(state,action)=>{
        console.log("rejected");
        
    },
    
    }
})


export const { addnurse } = PatientSlice.actions;
export default PatientSlice.reducer;
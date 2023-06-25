import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import jwtDecode from "jwt-decode";

export const getNurse = createAsyncThunk("nurse/getNurse", async (_, { rejectWithValue }) => { 
  try {
      const token = localStorage.getItem("token");
      // const user = localStorage.getItem("user");
      const decoded = jwtDecode(token);
      console.log(decoded);
      const id = decoded.userid;
      // let id = "64843be3294d0690b64c710a";
      // let id = user._id;
      // console.log(user.id);
  const response = await axios.get(`http://localhost:3500/nurse/nurseProfile/${id}`
  // {
  //         headers: { authorization: `Bearer ${token}` },
  //       }
  );
      console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


 

export const updateNurseEducation = createAsyncThunk(
  "nurse/updateNurseEducation",
  async (
    // The data object contains the nurse id, education index and updated education fields
    { nurseEducation_id, index, values },
    { rejectWithValue }
  ) => {
    try {
      // alert();
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      console.log(decoded);
      const id = decoded.userid;      // console.log(values);
      // console.log(nurseEducation_id);
      // console.log( id);

      // Send a PUT request to the server with the updated education data
      const response = await axios.put(
        `http://localhost:3500/nurse/${id}/education/${nurseEducation_id}`,
        values
      );

      // Return the updated education data
      // console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log(values);

      // Handle errors with rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteNurseEducation = createAsyncThunk(
  "nurse/deleteNurseEducation",
  async ({ nurse_id, educationIndex }, { rejectWithValue }) => {
    try {
      // Send a DELETE request to the server to delete the education object
      const response = await axios.delete(
        `http://localhost:3500/nurse/${nurse_id}/education/${educationIndex}`
      );

      // Return the updated nurse profile data
      return response.data;
    } catch (error) {
      // Handle errors with rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNurseExperience = createAsyncThunk(
  "nurse/updateNurseExperience",
  async (
    // The data object contains the nurse id, experience index and updated experience fields
    { nurseExperience_id, index, values },
    { rejectWithValue }
  ) => {
    try {
      // alert();
      const token = localStorage.getItem("token");
      // const user = localStorage.getItem("user");
      const decoded = jwtDecode(token);
      console.log(decoded);
      const id = decoded.userid;      console.log(values);
      console.log(nurseExperience_id);
      console.log( id);
      // Send a PUT request to the server with the updated experience data
      const response = await axios.put(
        `http://localhost:3500/nurse/${id}/experience/${nurseExperience_id}`,
        values
      );

      // Return the updated experience data
      console.log(response.data);

      return response.data;
    } catch (error) {
      // Handle errors with rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNurseExperience = createAsyncThunk(
  "nurse/deleteNurseExperience",
  async (
    // The data object contains the nurse id and experience index
    { nurse_id, experience_id },
    { rejectWithValue }
  ) => {
    try {
      console.log(experience_id);
      console.log(nurse_id);
      // Send a DELETE request to the server to delete the experience object
      const response = await axios.delete(
        `http://localhost:3500/nurse/${nurse_id}/experience/${experience_id}`
      );

      // Return the updated nurse profile data
      return response.data;
    } catch (error) {
      // Handle errors with rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNurseInfo = createAsyncThunk(
  "nurse/updateNurseInfo",
  async (
    values, 
    { rejectWithValue }
  ) => {
    try {
      // alert();
      const token = localStorage.getItem("token");
      // const user = localStorage.getItem("user");
      const decoded = jwtDecode(token);
      console.log(decoded);
      const id = decoded.userid;
            console.log(id);
            console.log(values);
      const response = await axios.put(
        `http://localhost:3500/nurse/editNurseProf/${id}`,
        values
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Hany
export const addRateToNurse = createAsyncThunk('PatientSlice/addRateToNurse', async ({ NurseProfileId, ratenumbering }) => {
  console.log(NurseProfileId);
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const patientId = decoded.userid;
    console.log("patientId.....",patientId);
    console.log("NurseProfileId.....",NurseProfileId);
    console.log(ratenumbering);
    const response = await axios.put(`http://localhost:3500/patient/addrate/${patientId}/${NurseProfileId}`, { rate: ratenumbering }, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log("responseRate....",response.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
});






  const nurseProfileSlice = createSlice({
    name: "nurseProfile",
        initialState: {
            nurseProfile: {},
        },
        reducers: {
          //  getNurse(state, action) {
          //   state.nurse = action.payload;
          //   console.log(state.nurse);
          //   },
        },
        extraReducers:  {
            [getNurse.pending]: (state) => {
                console.log("pending");
            },
            [getNurse.fulfilled]: (state, action) => {
             
                console.log(action.payload);
                state.nurseProfile = action.payload;
                // console.log("pending");
            },
            [getNurse.rejected]: (state, action) => {
                 console.log("rejected")
            },


            // Hany
          [addRateToNurse.pending]:(state,action)=>{
              console.log("pending");
              
          },
          [addRateToNurse.fulfilled]:(state,action)=>{
              console.log("fulfilled");
              // console.log(action.payload);
              state.nurseProfile = action.payload;
              // console.log(state.cart);
              // return state.cart
              
          },
          [addRateToNurse.rejected]:(state,action)=>{
              console.log("rejected");
              
          },
        }

})
    export default nurseProfileSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import NurseSlice from './Slices/NurseSlice';
import PatientSlice from './Slices/PatientSlice';
import DeviceSlice from "./Slices/DeviceSlice";
import nurseProfileSlice from "./Slices/NurseProfileR";
import CartSlice from "./Slices/CartSlice";
import OrderSlice from "./Slices/OrderSlice";
 
export const store = configureStore({
    reducer: {
     PatientSlice,
    NurseSlice,
    DeviceSlice,
    nurseProfileSlice,
    CartSlice,
    OrderSlice,
  },
})



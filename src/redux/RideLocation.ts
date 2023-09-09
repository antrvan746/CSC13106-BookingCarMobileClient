import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { LocationCoordinate } from "../types/LocationItem";

export type RideLocationState = {
  pickUp: LocationCoordinate | null,
  dropOff: LocationCoordinate | null,

} 

const initalRideLocationState:RideLocationState = {
  pickUp:null,
  dropOff:null
}

export const rideLocationSlice = createSlice({
  name:"RideLocationState",
  initialState: initalRideLocationState,

  reducers:{
    setPickUpState:(state,action:PayloadAction<LocationCoordinate>) =>{
      return{
        ...state,
        pickUp: action.payload
      }
    },
    setDropOffState:(state,action:PayloadAction<LocationCoordinate>) =>{
      return{
        ...state,
        dropOff: action.payload
      }
    },
    setRideLocationState:(state,action:PayloadAction<RideLocationState>)=>{
      return {...action.payload};
    }
  }
});
export const {setPickUpState,setDropOffState,setRideLocationState} = rideLocationSlice.actions;

export const selectRideLocationState = (state:RootState) => state.rideLocation;

export default rideLocationSlice;
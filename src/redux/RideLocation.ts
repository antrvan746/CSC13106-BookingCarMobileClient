import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { GooglePlaceSuggest } from "../query/GooglePlace";

export type RideLocationState = {
  pickUp: GooglePlaceSuggest | null,
  dropOff: GooglePlaceSuggest | null
} 

const initalRideLocationState:RideLocationState = {
  pickUp:null,
  dropOff:null
}

export const rideLocationSlice = createSlice({
  name:"RideLocationState",
  initialState: initalRideLocationState,

  reducers:{
    setPickUpState:(state,action:PayloadAction<GooglePlaceSuggest>) =>{
      return{
        ...state,
        pickUp: action.payload
      }
    },
    setDropOffState:(state,action:PayloadAction<GooglePlaceSuggest>) =>{
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
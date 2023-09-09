import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type TripState = {
  data: null | {
    trip_id: string,
  }
}

const initalTripState:TripState = {
  data: null
}

export const TripStateSlice = createSlice({
  name: "TripState",
  initialState: initalTripState,
  reducers:{
    updateTripState: (state, action: PayloadAction<TripState>)=>{
      return action.payload
    }
  }
})
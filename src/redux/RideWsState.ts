import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const validWsState = ["Unavailable","Available"] as const;

export type RideWsStateValue = typeof validWsState[number];
export const validWsStateName = [...validWsState];

export type RideWsState = {
	state: RideWsStateValue,
}

const initalAppState: RideWsState = {
	state: "Unavailable"
}


export const RideWsStateSlice = createSlice({
	name: "RideWsState",
	initialState: initalAppState,

	reducers: {
		updateRideWsState: (state, action: PayloadAction<RideWsState>) => {
			return { ...action.payload }
		}
	},
});


export const { updateRideWsState } = RideWsStateSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectRideWsState = (state: RootState) => state.rideWsState;

export default RideWsStateSlice;
import { SliceCaseReducers, ValidateSliceCaseReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { NavScreenNames, StackScreenProps } from "../types/Screens";

const validAppState = ["Idle" , "Search", "Book" , "Finding" , "Waiting" , "Going"] as const;

export type AppStateName = typeof validAppState[number];
export const AppStateNameValues = [...validAppState];

export type AppState = {
	state: AppStateName,
}
const appStateName = "AppState"

const initalAppState: AppState = {
	state: "Idle"
}


export const appStateSlice = createSlice({
	name: appStateName,
	initialState: initalAppState,

	reducers: {
		updateAppState: (state, action: PayloadAction<AppState>) => {
			return { ...action.payload }
		}
	},
});


export const { updateAppState } = appStateSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectAppState = (state: RootState) => state.appState;

export default appStateSlice;
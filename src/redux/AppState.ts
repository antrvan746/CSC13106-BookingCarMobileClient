import { SliceCaseReducers, ValidateSliceCaseReducers, createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AppState = {
	state:"Idle" | "Finding" | "Waiting" | "Going"
}



const initalAppState:AppState = {
  state: "Idle"
}
const appStateName = "AppState"


export const appStateSlice = createSlice({
	name: appStateName,
	initialState:initalAppState,
  
	reducers: {
		updateAppState: (state,action:PayloadAction<AppState>)=>{
			return {...action.payload}
		}
	},
});


export const { updateAppState } = appStateSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectAppState = (state: RootState) => state.appState;

export default appStateSlice ;
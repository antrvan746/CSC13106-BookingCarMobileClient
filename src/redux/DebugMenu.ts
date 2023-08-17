import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type DebugMenuIsOpen = {
  isOpen: boolean
	goserver: string
	nextserver: string
}

const debugMenuIsOpenName = "DebugMenuOpen";

export const debugMenuOpenSlice = createSlice({
	name: debugMenuIsOpenName,
	initialState: {
    isOpen:false,
		goserver: "http://10.0.2.2:3080",
		nextserver: "http://10.0.2.2:3000/"
  },

	reducers: {
		updateDebugMenu: (state, action: PayloadAction<{isOpen:boolean}>) => {
			return{
				...state,
				...action.payload
			};
		},
		updateDebugLink:(state,action: PayloadAction<{goserver:string,nextserver:string}>)=>{
			return{
				...state,
				...action.payload
			}
		}
	},
});

export const {updateDebugMenu,updateDebugLink} = debugMenuOpenSlice.actions;
export const selectDebugState = (state:RootState) => state.debugMenu

export default debugMenuOpenSlice;
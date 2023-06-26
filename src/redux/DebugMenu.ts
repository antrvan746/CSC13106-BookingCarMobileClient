import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type DebugMenuIsOpen = {
  isOpen: boolean
}

const debugMenuIsOpenName = "DebugMenuOpen";

export const debugMenuOpenSlice = createSlice({
	name: debugMenuIsOpenName,
	initialState: {
    isOpen:false
  },

	reducers: {
		updateDebugMenu: (state, action: PayloadAction<DebugMenuIsOpen>) => {
			return{...action.payload};
		}
	},
});

export const {updateDebugMenu} = debugMenuOpenSlice.actions;
export const selectDebugState = (state:RootState) => state.debugMenu

export default debugMenuOpenSlice;
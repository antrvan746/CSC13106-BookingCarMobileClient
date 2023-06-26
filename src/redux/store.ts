import { configureStore } from '@reduxjs/toolkit';
import AppStateSlice from './AppState';
import DebugMenuSlice from './DebugMenu';


const ReduxStore = configureStore({
	reducer: {
    appState:  AppStateSlice.reducer,
    debugMenu: DebugMenuSlice.reducer
  },
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
export default ReduxStore;

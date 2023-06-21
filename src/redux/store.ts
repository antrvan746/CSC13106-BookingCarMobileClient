import { configureStore } from '@reduxjs/toolkit';
import AppState from './AppState';

const ReduxStore = configureStore({
	reducer: {
    appState:  AppState.reducer
  },
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
export default ReduxStore;

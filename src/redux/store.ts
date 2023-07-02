import { configureStore} from '@reduxjs/toolkit';
import AppStateSlice from './AppState';
import DebugMenuSlice from './DebugMenu';
import googlePlaceApi from '../query/GooglePlace';

const ReduxStore = configureStore({
	reducer: {
    appState:  AppStateSlice.reducer,
    debugMenu: DebugMenuSlice.reducer,
    [googlePlaceApi.reducerPath]: googlePlaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    googlePlaceApi.middleware
  ]),
  
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
export default ReduxStore;

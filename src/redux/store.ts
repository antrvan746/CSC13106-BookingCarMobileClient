import { configureStore} from '@reduxjs/toolkit';
import AppStateSlice from './AppState';
import DebugMenuSlice from './DebugMenu';
import RideLocationSlice from './RideLocation';
import googlePlaceApi from '../query/GooglePlace';
import googleGeocodeApi from '../query/GoogleGeocode';

const ReduxStore = configureStore({
	reducer: {
    appState:  AppStateSlice.reducer,
    debugMenu: DebugMenuSlice.reducer,
    rideLocation: RideLocationSlice.reducer,
    [googlePlaceApi.reducerPath]: googlePlaceApi.reducer,
    [googleGeocodeApi.reducerPath]:googleGeocodeApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    googlePlaceApi.middleware,
    googleGeocodeApi.middleware
  ]),
  
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
export default ReduxStore;

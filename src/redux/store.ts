import { configureStore} from '@reduxjs/toolkit';
import AppStateSlice from './AppState';
import DebugMenuSlice from './DebugMenu';
import RideLocationSlice, { rideLocationSlice } from './RideLocation';
import googlePlaceApi from '../query/GooglePlace';
import googleGeocodeApi from '../query/GoogleGeocode';
import LoginStateSlice from './LoginState';
import locationIQApi from '../query/LocationIQ';
import UserDetailApi from '../query/UserData';
import RideWsStateSlice from './RideWsState';


const ReduxStore = configureStore({
	reducer: {
    appState:  AppStateSlice.reducer,
    debugMenu: DebugMenuSlice.reducer,
    rideLocation: RideLocationSlice.reducer,
    loginState: LoginStateSlice.reducer,
    rideWsState: RideWsStateSlice.reducer,
    [googlePlaceApi.reducerPath]: googlePlaceApi.reducer,
    [googleGeocodeApi.reducerPath]:googleGeocodeApi.reducer,
    [locationIQApi.reducerPath]:locationIQApi.reducer,
    [UserDetailApi.reducerPath]:UserDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    googlePlaceApi.middleware,
    googleGeocodeApi.middleware,
    locationIQApi.middleware,
    UserDetailApi.middleware
  ]),
  
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
export default ReduxStore;

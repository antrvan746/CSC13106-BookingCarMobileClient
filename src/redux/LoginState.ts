import { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type LoginState = {
  user: null | {
    displayName: string | null
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    locationIQKey?:string
  }
}

const initalLoginState: LoginState = {
  user: null
}

export const LoginStateSlice = createSlice({
  name: "LoginState",
  initialState: initalLoginState,
  reducers: {
    setLoginState: (state, action: PayloadAction<LoginState>) => {
      return { ...action.payload };
    }
  }
});
export const { setLoginState } = LoginStateSlice.actions;
export const selectLoginState = (state: RootState) => state.loginState;

export default LoginStateSlice;
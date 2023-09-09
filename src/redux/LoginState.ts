import { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserDetailInfo } from '../query/UserData';

export type LoginState = {
  user: null | {
    locationIQKey?:string,
    detail?: UserDetailInfo
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
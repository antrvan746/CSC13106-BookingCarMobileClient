import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {NavLoginNames,LoginStackParam} from "./LoginScreens";

export type NavScreenNames = 'Main' | "Search" | "Ride" | "Login" | NavLoginNames;



interface StackScreenProps extends NativeStackScreenProps<RootStackParamList, NavScreenNames>{}; 
export type {StackScreenProps}



export type RootStackParamList = {
  Main: undefined;
  Search: undefined;
  Ride: undefined;
  Login:undefined;
} & LoginStackParam;
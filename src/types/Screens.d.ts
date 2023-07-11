import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavScreenNames = 'Main' | "Search" | "Ride" | "Login";



interface StackScreenProps extends NativeStackScreenProps<RootStackParamList, NavScreenNames>{}; 
export type {StackScreenProps}

export type RootStackParamList = {
  Main: undefined;
  Search: undefined;
  Ride: undefined;
  Login:undefined;
};
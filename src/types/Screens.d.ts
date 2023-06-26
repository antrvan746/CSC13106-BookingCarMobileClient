import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavScreenNames = 'Main' | "Search" | "Ride";

export type RootStackParamList = {
  Main: ScreenWrapperProps;
  Search: ScreenWrapperProps;
  Ride: ScreenWrapperProps;
};

interface StackScreenProps extends NativeStackScreenProps<RootStackParamList, NavScreenNames>{}; 
export type {StackScreenProps}
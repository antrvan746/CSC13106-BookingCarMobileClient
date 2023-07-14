import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavLoginNames = 'Select' | "Phone" | "PhoneVerify" | "Mail";

export type LoginStackParam = {
  Select: undefined;
  Phone: undefined;
  PhoneVerify: { phone: string }
  Mail: undefined;
};

export interface LoginStackSreenProps extends NativeStackScreenProps<LoginStackParam, NavLoginNames>{}
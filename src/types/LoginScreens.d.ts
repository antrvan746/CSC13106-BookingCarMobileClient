import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavLoginNames = 'Select' | "Phone" | "PhoneVerify" | "Mail" | "Detail";

export type LoginStackParam = {
  Select: undefined;
  Phone: undefined;
  PhoneVerify: { phone: string }
  Mail: undefined;
  Detail: {user: {
    phone:string,
    email:string | null,
    name:string | null
  }}
};

export interface LoginStackSreenProps extends NativeStackScreenProps<LoginStackParam, NavLoginNames>{}
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type Driver = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  carModel: string;
  carNumber: string;
};

export type Damage = {
  side: string;
  part: string;
  description: string;
  sketch: string; // Зроблено обов'язковим
};

export type Protocol = {
  id: string;
  date: string;
  driverA: Driver;
  driverB: Driver;
  damage: Damage;
};

export type RootStackParamList = {
  Home: undefined;
  DriverAForm: undefined;
  DriverBForm: { driverA: Driver };
  DamageDetails: { 
    driverA: Driver;
    driverB: Driver;
  };
  ProtocolList: undefined;
  ProtocolDetails: { protocol: Protocol };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DriverAFormScreenProps = NativeStackScreenProps<RootStackParamList, 'DriverAForm'>;
export type DriverBFormScreenProps = NativeStackScreenProps<RootStackParamList, 'DriverBForm'>;
export type DamageDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'DamageDetails'>;
export type ProtocolListScreenProps = NativeStackScreenProps<RootStackParamList, 'ProtocolList'>;
export type ProtocolDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProtocolDetails'>;
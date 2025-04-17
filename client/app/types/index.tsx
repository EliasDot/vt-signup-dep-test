import { RouteProp } from "@react-navigation/native";
import { ReactNode } from "react";

// Event Interface
//export interface Event {
//  id: string;
//  title: string;
//  category: string;
//  organizer: string;
//  image: string;
//  date: string;
//  time: string;
//  participants: number;
//  max_participants: number;
//  location: string;
//}

export interface Event {
  e_name: string;
  e_category: string;
  e_location: string;
  e_date: string;
  e_organizer: string;
  e_max_count: number;
  e_count_user: number;
}

// User Interface
export interface User {
  id?: string;
  a_name: string;
  email?: string;
  avatar?: string;
}

// App Settings Interface
export interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  locationServices: boolean;
}

// Navigation Parameter Liste
export type RootStackParamList = {
  Home: { updatedEvent?: Event } | undefined;
  Settings: undefined;
  Account: undefined;
  AddEvent: { editEvent?: Event } | undefined;
  EventDetail: { eventId: string };
  LogInScreen: undefined;
  DetailsEvent: undefined;
};

export interface Event {
  id: string;
  name: string;
  imageUri: string;
  participants: number;
  location: string;
}

export interface HomeScreenProps {
  navigation: any;
}

// Route Props Typen
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type SettingsScreenRouteProp = RouteProp<RootStackParamList, "Settings">;
export type AccountScreenRouteProp = RouteProp<RootStackParamList, "Account">;
export type AddEventScreenRouteProp = RouteProp<RootStackParamList, "AddEvent">;
export type EventDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "EventDetail"
>;

// Component Props Types
export interface EventItemProps {
  event: Event;
  onPress?: (event: Event) => void;
}

export interface FloatingMenuProps {
  onSettingsPress: () => void;
  onAccountPress: () => void;
  onAddEventPress: () => void;
}

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "outline" | "danger";
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  icon?: ReactNode;
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  required?: boolean;
  icon?: string;
  iconType?: "AntDesign" | "FontAwesome" | "MaterialIcons";
  error?: string;
}

// Store/Context Types
export interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

export interface EventsAction {
  type:
    | "ADD_EVENT"
    | "UPDATE_EVENT"
    | "DELETE_EVENT"
    | "SET_EVENTS"
    | "SET_LOADING"
    | "SET_ERROR";
  payload?: any;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UserAction {
  type: "SET_USER" | "LOGOUT" | "SET_LOADING" | "SET_ERROR";
  payload?: any;
}

export interface SettingsState {
  settings: AppSettings;
  loading: boolean;
  error: string | null;
}

export interface SettingsAction {
  type: "UPDATE_SETTINGS" | "RESET_SETTINGS" | "SET_LOADING" | "SET_ERROR";
  payload?: any;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// General Utility Types
export type ThemeMode = "light" | "dark" | "system";

export interface Dimensions {
  width: number;
  height: number;
}

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

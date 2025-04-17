import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./app/types";

import HomeScreen from "./app/screens/HomeScreen";
import AccountScreen from "./app/screens/AccountScreen";
import AddEventScreen from "./app/screens/AddEventScreen";
import LoginScreen from "./app/screens/LoginScreen";
import DetailsEventScreen from "./app/screens/DetailsEventScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <Stack.Navigator
        initialRouteName="LogInScreen" /* Sollte LogInScreen sein */
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          cardStyle: { backgroundColor: "#f8f9fa" },
        }}
      >
        <Stack.Screen
          name="LogInScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: "Mein Konto",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: "Meine Events",
          }}
        />
        {/* <Stack.Screen
          name="Settings"
          //   component={SettingsScreen}
          options={{
            title: "Einstellungen",
          }}
        /> */}
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerShown: false,
            title: "Mein Konto",
          }}
        />

        <Stack.Screen
          name="AddEvent"
          component={AddEventScreen}
          options={{
            headerShown: false,
            title: "Neues Event",
          }}
        />
        <Stack.Screen
          name="DetailsEvent"
          component={DetailsEventScreen}
          options={{
            headerShown: false,
            title: "Details Screen",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

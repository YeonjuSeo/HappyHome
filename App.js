import { StatusBar } from "expo-status-bar";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen
import HomeScreen from "./src/screens/Home";
import CertificationScreen from "./src/screens/Certification/index";
import phoneAuthScreen from "./src/screens/Certification/phoneAuthScreen";
import kakaoLoginScreen from "./src/screens/Login/kakaoLoginScreen";
import WishLocationScreen from "./src/screens/Onboarding/WishLocation";
import LocationSearchScreen from "./src/screens/Onboarding/LocationSearch";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Certification" component={CertificationScreen} />
        <Stack.Screen name="phoneAuth" component={phoneAuthScreen} />
        <Stack.Screen name="kakaoLogin" component={kakaoLoginScreen} />
        <Stack.Screen name="WishLocation" component={WishLocationScreen} />
        <Stack.Screen name="LocationSearch" component={LocationSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

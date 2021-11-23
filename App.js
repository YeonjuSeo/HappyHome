import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "./src/components/molecules/Header";
import { RecoilRoot } from "recoil-react-native";

// screen
import HomeScreen from "./src/screens/Home";
import FilterScreen from "./src/screens/Home/FilterScreen";
import CertificationScreen from "./src/screens/Certification/index";
import phoneAuthScreen from "./src/screens/Certification/phoneAuthScreen";
import kakaoLoginScreen from "./src/screens/Login/kakaoLoginScreen";
import WishLocationScreen from "./src/screens/Onboarding/WishLocation";
import LocationSearchScreen from "./src/screens/Onboarding/LocationSearch";

import WritePostScreen from "./src/screens/Post/WritePost";
import DetailsScreen from "./src/screens/Post/Details";

// Auth 관련
import LoginScreen from "./src/screens/Login/loginScreen";
import PhoneAuthLandingPage from "./src/screens/Certification/phoneAuthLandingPage";
import UnivAuthLandingPage from "./src/screens/Certification/univAuthLandingPage";
import NicknameSettingPage from "./src/screens/Certification/nicknameSettingPage";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              // headerTitle: () => (
              //   <Button
              //     title="test"
              //     onPress={() => {
              //       console.log("HeaderTitlePressed");
              //     }}
              //   />
              // ),
              headerRight: () => <Button title="My" />,
            })}
          />
          <Stack.Screen
            name="Filter"
            component={FilterScreen}
            options={({ navigation, route }) => ({
              headerLeft: () => (
                <Button
                  title="goBack"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerRight: () => <Button title="초기화" />,
            })}
          />
          <Stack.Screen name="Certification" component={CertificationScreen} />
          <Stack.Screen name="phoneAuth" component={phoneAuthScreen} />
          <Stack.Screen name="kakaoLogin" component={kakaoLoginScreen} />
          <Stack.Screen name="WishLocation" component={WishLocationScreen} />
          <Stack.Screen
            name="LocationSearch"
            component={LocationSearchScreen}
          />
          <Stack.Screen name="WritePost" component={WritePostScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PhoneAuthLandingPage" component={PhoneAuthLandingPage} />
          <Stack.Screen name="UnivAuthLandingPage" component={UnivAuthLandingPage} />
          <Stack.Screen name="NicknameSettingPage" component={NicknameSettingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>

  );
}

/*
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('token')
        setAuth(token)
        console.log(token)
      } catch (err) {
        console.log(err)
      }
    }, 10)
  },[]) 
  */
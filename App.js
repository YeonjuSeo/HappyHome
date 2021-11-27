import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
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
import UploadImgScreen from "./src/screens/Post/UploadImg";
import DetailsScreen from "./src/screens/Post/Details";
import MyPageScreen from "./src/screens/MyPage";
import ChattingRoomScreen from "./src/screens/Chat/ChattingRoom";
import ResultScreen from "./src/screens/Home/ResultScreen";

// Auth 관련
import PhoneAuthLandingPage from "./src/screens/Certification/phoneAuthLandingPage";
import UnivAuthLandingPage from "./src/screens/Certification/univAuthLandingPage";
import NicknameSettingPage from "./src/screens/Certification/nicknameSettingPage";

//Test
import Test from "./src/screens/Test";


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Certification" component={CertificationScreen} />
          <Stack.Screen name="phoneAuth" component={phoneAuthScreen} />
          <Stack.Screen name="kakaoLogin" component={kakaoLoginScreen} />
          <Stack.Screen name="WishLocation" component={WishLocationScreen} />
          <Stack.Screen
            name="LocationSearch"
            component={LocationSearchScreen}
          />
          <Stack.Screen name="WritePost" component={WritePostScreen} />
          <Stack.Screen name="UploadImg" component={UploadImgScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="PhoneAuthLandingPage"
            component={PhoneAuthLandingPage}
          />
          <Stack.Screen
            name="UnivAuthLandingPage"
            component={UnivAuthLandingPage}
          />
          <Stack.Screen
            name="NicknameSettingPage"
            component={NicknameSettingPage}
          />
          <Stack.Screen name="MyPage" component={MyPageScreen} />
          <Stack.Screen name="ChattingRoom" component={ChattingRoomScreen} />
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

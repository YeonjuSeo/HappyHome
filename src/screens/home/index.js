import React, { useState, useEffect } from "react";
import axios from "axios";

import * as Location from "expo-location";
import { useRecoilState } from "recoil-react-native";
import getEnvVars from "../../settings/environment";

// components
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Touchable,
} from "react-native";
import LoginScreenComp from "./LoginScreenComp";
import HomeComp from "./HomeComp";

import SplashScreen from "../Splash";

// states
import { wishAddrState } from "../../states/User";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInState } from "../../states/IsLoggedIn";
import { useFocusEffect } from "@react-navigation/native";
import { userInfoState } from "../../states/UserInfo";

export function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // const canLoad = useWishAddr(se`tIsLoading);
  const [location, setLocation] = useState(null);
  const [wishAddr, setWishAddr] = useRecoilState(wishAddrState);

  const { kakaoApiKey } = getEnvVars();
  useEffect(() => {
    if (wishAddr == "")
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        await setLocation({
          latitude: String(location.coords.latitude),
          longitude: String(location.coords.longitude),
        });
      })();
  }, []);
  useEffect(() => {
    if (wishAddr == "" && location)
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.longitude}&y=${location.latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoApiKey}`,
            },
          }
        )
        .then(function (response) {
          setWishAddr(response.data?.documents[0].address.region_3depth_name);
          setIsLoading(false);
        });
  }, [location]);

  // 최대한 안겹치게 저는 요기 아래로 작업했습니다 ㅎㅎ...
  useEffect(() => {
    // 처음 토큰이 있나 없나 검증
    initializeUserInfo();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const initializeUserInfo = async () => {
    //await AsyncStorage.removeItem("auth");
    const ud = await AsyncStorage.getItem("auth");
    if (!ud) {
      //토큰이 없음
      setIsLoggedIn(false);
      return;
    }
    const userData = JSON.parse(ud);
    const { token } = userData;

    axios
      .get(
        "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/auth/verifytoken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        const {
          isPhoneAuthDone,
          isUnivAuthDone,
          isNicknameSettingDone,
          photoURL,
        } = res.data.data.data;
        const { uid } = res.data.data.decoded;
        let data = {
          uid,
          token,
          isPhoneAuthDone,
          isUnivAuthDone,
          isNicknameSettingDone,
          photoURL,
        };

        setIsLoggedIn(true);
        setUserInfo(data);
        await AsyncStorage.setItem("auth", JSON.stringify(data));
      })
      .catch((err) => {
        // 토큰은 있지만, 유효하지 않은 토큰일 때
        console.log(err);
        setIsLoggedIn(false);
        return;
      });

    //axios.defaults.headers.common['Authorization'] = ud.token;
  };

  const LoginScreen = () => {
    useFocusEffect(
      React.useCallback(() => {
        if (userInfo) {
          console.log("callback");
          if (!userInfo.isPhoneAuthDone) {
            console.log("PhoneAuthLandingPage");
            navigation.navigate("PhoneAuthLandingPage");
          } else if (userInfo.isPhoneAuthDone && !userInfo.isUnivAuthDone) {
            console.log("UnivAuthLandingPage");
            navigation.navigate("UnivAuthLandingPage");
          } else if (
            !userInfo.isPhoneAuthDone &&
            userInfo.isUnivAuthDone &&
            !userInfo.isNicknameSettingDone
          ) {
            console.log("NicknameSettingPage");
            navigation.navigate("NicknameSettingPage");
          }
        }
      }, [isLoggedIn])
    );

    return (
      <View>
        <Text>login Screen</Text>
        <Button
          title="카카오 로그인"
          onPress={() => {
            navigation.navigate("kakaoLogin");
          }}
        />
        <Button
          title="Check token and user info"
          onPress={async () => {
            let token = null;
            auth = await AsyncStorage.getItem("auth");
            console.log(`auth: ${auth}`);
            console.log(`isLoggedIn : ${isLoggedIn}`);
            console.log(`userInfo : ${userInfo}`);
          }}
        />
        <Button
          title="remove token and userInfo"
          onPress={async () => {
            let token = null;
            await AsyncStorage.removeItem("auth");
            setIsLoggedIn(false);
            setUserInfo(null);
          }}
        />
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          {!isLoggedIn && <LoginScreen />}
          {isLoggedIn &&
            userInfo &&
            (!userInfo.isPhoneAuthDone ||
              !userInfo.isUnivAuthDone ||
              !userInfo.isNicknameSettingDone) && <LoginScreen />}
          {isLoggedIn &&
            userInfo &&
            userInfo.isPhoneAuthDone &&
            userInfo.isUnivAuthDone &&
            userInfo.isNicknameSettingDone && (
              <HomeComp navigation={navigation} />
            )}
        </>
      )}
    </>
  );
}

export default HomeScreen;

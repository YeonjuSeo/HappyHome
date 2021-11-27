import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components/native";
import * as Location from "expo-location";
import { useRecoilState } from "recoil-react-native";
import getEnvVars from "../../settings/environment";

// components
import { View, Image } from "react-native";

import LoginScreenComp from "../Login/LoginScreenComp";
import HomeComp from "./HomeComp";
import SplashScreen from "../Splash";
import KakaoButton from "../../components/atoms/kakaoButton";

// states
import { wishAddrState, wishCoorState } from "../../states/User";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInState } from "../../states/IsLoggedIn";
import { useFocusEffect } from "@react-navigation/native";
import { userInfoState } from "../../states/UserInfo";

import { Bold17 } from "../../styles/typography";
import { GRAY4, PRIMARY } from "../../styles/color";

export function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // const canLoad = useWishAddr(se`tIsLoading);
  const [wishCoor, setWishCoor] = useRecoilState(wishCoorState);
  const [location, setLocation] = useState(null);
  const [wishAddr, setWishAddr] = useRecoilState(wishAddrState);

  const { kakaoApiKey } = getEnvVars();
  useEffect(() => {
    if (wishAddr !== "") setIsLoading(false);
    else
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        await setWishCoor({
          x: location.coords.longitude,
          y: location.coords.latitude,
        });
        await axios
          .get(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${String(
              location.coords.longitude
            )}&y=${String(location.coords.latitude)}`,
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
      })();
  }, []);

  // 최대한 안겹치게 저는 요기 아래로 작업했습니다 ㅎㅎ...
  useEffect(() => {
    // 처음 토큰이 있나 없나 검증
    initializeUserInfo();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const initializeUserInfo = async () => {
    await AsyncStorage.removeItem("auth");
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
          isPosted,
          photoURL,
          nickname,
          name,
          email,
        } = res.data.data.data;
        const { uid } = res.data.data.decoded;
        let data = {
          uid,
          token,
          isPhoneAuthDone,
          isUnivAuthDone,
          isNicknameSettingDone,
          isPosted,
          photoURL,
          nickname,
          name,
          email,
        };
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
            console.log("phoneAuth");
            navigation.navigate("phoneAuth");
          } else if (userInfo.isPhoneAuthDone && !userInfo.isUnivAuthDone) {
            console.log("UnivAuthLandingPage");
            navigation.navigate("UnivAuthLandingPage");
          } else if (
            userInfo.isPhoneAuthDone &&
            userInfo.isUnivAuthDone &&
            !userInfo.isNicknameSettingDone
          ) {
            console.log("NicknameSettingPage");
            navigation.navigate("NicknameSettingPage");
          }
        }
      }, [isLoggedIn])
    );
    const Wrapper = styled.SafeAreaView`
      flex: 1;
      background-color: white;
    `;
    const UpperWrapper = styled.View`
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    `;
    const DownerWrapper = styled.View`
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 50px;
    `;
    const TextWrapper = styled.View`
      align-items: center;
    `;
    const TitleGrayTxt = styled.Text`
      ${Bold17};
      color: ${GRAY4};
    `;
    const TitlePrimaryTxt = styled.Text`
      ${Bold17};
      color: ${PRIMARY};
    `;

    return (
      <Wrapper>
        <UpperWrapper>
          <Image
            source={require("../../assets/HalfLogoImg.png")}
            style={{
              width: 90,
              height: 90,
              marginBottom: 30,
            }}
          />
          <TextWrapper>
            <TitleGrayTxt>간편하게 로그인하고</TitleGrayTxt>
            <View style={{ flexDirection: "row" }}>
              <TitlePrimaryTxt>숨숨집</TitlePrimaryTxt>
              <TitleGrayTxt>을 이용해보세요</TitleGrayTxt>
            </View>
          </TextWrapper>
        </UpperWrapper>
        <DownerWrapper>
          <KakaoButton navigation={navigation} />
        </DownerWrapper>
      </Wrapper>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components/native";
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
import SplashScreen from "../Splash";
import Header from "../../components/molecules/Header";
import PostCard from "../../components/molecules/PostCard";
import FilterIcon from "../../assets/Filter.png";
import LowerButton from "../../components/molecules/LowerButton";

// states
import { wishAddrState } from "../../states/User";

// 요 아래로는 제가 import 한 것들입니다!
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedInState } from "../../states/IsLoggedIn";
import { useFocusEffect } from '@react-navigation/native';
import { userInfoState } from "../../states/UserInfo"

export function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRecentOrder, setIsRecentOrder] = useState(true);
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
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=127.423084873712&y=37.0789561558879`,
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
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const initializeUserInfo = async () => {
    //await AsyncStorage.removeItem("auth");
    const ud = await AsyncStorage.getItem('auth');
    if (!ud){
      //토큰이 없음
      setIsLoggedIn(false);
      return;
    }
    const userData = JSON.parse(ud);
    const { token } = userData;

    axios.get(
      "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/auth/verifytoken",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then( async (res) => {
      const { isPhoneAuthDone, isUnivAuthDone, isNicknameSettingDone, photoURL } = res.data.data.data;
      const { uid } = res.data.data.decoded;
      let data = {
        uid,
        token,
        isPhoneAuthDone,
        isUnivAuthDone,
        isNicknameSettingDone,
        photoURL
      };

      setIsLoggedIn(true);
      setUserInfo(data);
      await AsyncStorage.setItem('auth', JSON.stringify(data))
    })
    .catch((err) => {
      // 토큰은 있지만, 유효하지 않은 토큰일 때
      console.log(err)
      setIsLoggedIn(false);
      return;
    })

    //axios.defaults.headers.common['Authorization'] = ud.token;
  };

  const LoginScreen = () => {
    useFocusEffect(
      React.useCallback(()=> {
        if(userInfo){
          console.log("callback")
            if(!userInfo.isPhoneAuthDone){
              console.log("PhoneAuthLandingPage")
              navigation.navigate("PhoneAuthLandingPage")
            }
            else if(userInfo.isPhoneAuthDone && !userInfo.isUnivAuthDone){
              console.log("UnivAuthLandingPage")
              navigation.navigate("UnivAuthLandingPage")
            }
            else if (!userInfo.isPhoneAuthDone && userInfo.isUnivAuthDone && !userInfo.isNicknameSettingDone){
              console.log("NicknameSettingPage")
              navigation.navigate("NicknameSettingPage")
            }
        }
      },[isLoggedIn])
    )

    return (
      <View>
        <Text>
          login Screen
        </Text>
        <Button
          title="카카오 로그인"
          onPress={() => {
            navigation.navigate("kakaoLogin");
          }}
        />
        <Button 
          title="Check token and user info"
          onPress={async () => {
            let token = null
            auth = await AsyncStorage.getItem("auth")
            console.log(`auth: ${auth}`)
            console.log(`isLoggedIn : ${isLoggedIn}`)
            console.log(`userInfo : ${userInfo}`)
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
    )
  }

  const HomeComponent = () => {
    return(
      <Wrapper>
            <Header navigation={navigation} addr={wishAddr} />
            <SearchBar placeholder={`${wishAddr}의 어떤 집을 찾고 계세요?`} />
            <SmallMenuWrapper>
              <Button
                title={isRecentOrder ? "최신순" : "거리순"}
                onPress={() => {
                  setIsRecentOrder(!isRecentOrder);
                }}
              />
              <Text> | </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Filter");
                }}
              >
                <Image source={FilterIcon} />
              </TouchableOpacity>
            </SmallMenuWrapper>
            <View>
              <PostCard navigation={navigation} />
            </View>
            <LowerButton
              onPress={() => {
                navigation.navigate("WritePost");
              }}
              txt={"매물있어요"}
            />
          </Wrapper>
    )
  }


  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
        {
          !isLoggedIn && (
            <LoginScreen />
          )
        }
        {
          isLoggedIn && userInfo && (!userInfo.isPhoneAuthDone || !userInfo.isUnivAuthDone || !userInfo.isNicknameSettingDone) && (
            <LoginScreen />
          )
        }
        {
            isLoggedIn && userInfo && userInfo.isPhoneAuthDone && userInfo.isUnivAuthDone && userInfo.isNicknameSettingDone && (
            <HomeComponent />
          )
        }
        </>
      )}
    </>
  );
}

export default HomeScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding: 0 16px;
`;
const SearchBar = styled.TextInput`
  background-color: white;
  border: 1px solid #ededed;
  height: 50px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  margin: 18px 0 20px 0;
`;

const SmallMenuWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const PostButton = styled.TouchableOpacity`
  background-color: #985de3;
  width: 107px;
  height: 61px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 45px;
  right: 16px;
`;
const PostButtonText = styled.Text`
  color: white;
  font-weight: 700;
`;

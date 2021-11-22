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
  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
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

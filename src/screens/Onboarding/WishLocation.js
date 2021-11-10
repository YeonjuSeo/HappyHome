import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import getEnvVars from "../../settings/environment";
import axios from "axios";

export function WishLocationScreen({ navigation, route }) {
  const [wishAddress, setWishAddress] = useState("");
  const [resp, setResp] = useState("");

  const { kakaoApiKey } = getEnvVars();

  useEffect(async () => {
    if (route.params?.wishAddr) {
      request(JSON.stringify(route.params?.wishAddr.address));
      await setWishAddress(JSON.stringify(route.params?.wishAddr.address));
    }
  }, [route.params?.wishAddr]);

  const request = (addr) => {
    axios
      .get(
        `https://dapi.kakao.com//v2/local/search/address.json?query=${addr}`,
        {
          headers: {
            Authorization: `KakaoAK ${kakaoApiKey}`,
          },
        }
      )
      .then(function (response) {
        setResp(response);
      });
  };
  return (
    <View>
      <Text>어디 근처에 살고 싶은가요?</Text>
      <Button
        title="검색하러 가기"
        onPress={() => {
          navigation.navigate("LocationSearch", {
            wishAddr: "",
          });
        }}
      />
      {/* <Button title="카카오로 검색하기" onPress={request} /> */}
      <Text>wishAddres: {wishAddress}</Text>
      <Text>전체 도로명 주소: {resp.data?.documents[0].address_name}</Text>
      <Text>
        지명/도로명/지번주소/도로명주소: {resp.data?.documents[0].address_type}
      </Text>
      <Text>x좌표: {resp.data?.documents[0].x}</Text>
      <Text>y좌표: {resp.data?.documents[0].y}</Text>
    </View>
  );
}

export default WishLocationScreen;

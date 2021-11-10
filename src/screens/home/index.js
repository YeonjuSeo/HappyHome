import React from "react";

import { Text, View, Button } from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>홈화면</Text>
      <Button
        title="본인인증하러가기슝슝"
        onPress={() => navigation.navigate("kakaoLogin")}
      />
      <Button
        title="온보딩에서 희망 거주지 검색하러 가기"
        onPress={() => navigation.navigate("WishLocation")}
      />
    </View>
  );
}

export default HomeScreen;

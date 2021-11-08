import React from "react";

import { Text, View, Button } from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>홈화면</Text>
      <Button
        title="본인인증하러가기슝슝"
        onPress={() => navigation.navigate("phoneAuth")}
      />
    </View>
  );
}

export default HomeScreen;
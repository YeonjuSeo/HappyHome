import React from "react";
import { Text, View, Button } from "react-native";

export function CertificationScreen({ navigation }) {
  return (
    <View>
      <Text>본인인증하기</Text>
      <Button
        title="본인인증하기"
        onPress={() => navigation.navigate("Certification")}
      />
    </View>
  );
}

export default CertificationScreen;

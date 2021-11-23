
import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";

const UnivAuthLandingPage = ({ route, navigation }) => {

  return (
    <View>
      <Text>
        대학 인증 랜딩 페이지
      </Text>
      <Button
        title="닉네임 설정하기"
        onPress={()=>{
          navigation.navigate("NicknameSettingPage");
        }}
      />
    </View>
  );
}

export default UnivAuthLandingPage;


import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneAuthLandingPage = ({ route, navigation }) => {

  return (
    <View>
      <Text>
        핸드폰 인증 랜딩 페이지
      </Text>
      <Button
        title="대학 인증하기"
        onPress={()=>{
          navigation.navigate("UnivAuthLandingPage");
        }}
      />
    </View>
  );
}

export default PhoneAuthLandingPage;

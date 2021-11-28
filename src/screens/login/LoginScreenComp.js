import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, Button, SafeAreaView } from "react-native";

export default function LoginScreenComp() {
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
}

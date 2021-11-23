
import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { StackActions } from '@react-navigation/native';


const NicknameSettingPage = ({ route, navigation }) => {

  return (
    <View>
      <Text>
        닉네임 등록하기
      </Text>
      <Button
        title="회원가입 완료"
        onPress={()=>{
          navigation.dispatch(
            StackActions.popToTop()
          )
        }}
      />
    </View>
  );
}

export default NicknameSettingPage;

import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import styled from "styled-components/native";
import BackIcon from "../../assets/icon_back.png";
import { YELLOW, GRAY4 } from "../../styles/color";
import { SemiBold17 } from "../../styles/typography";

const KakaoButton = ({navigation}) => {
  return (
    <View style={{width: '100%'}}>
      <ButtonWrapper 
        onPress={() =>{
          navigation.navigate("kakaoLogin");
        }}
      >
        <TitleGrayTxt>
          카카오계정으로 시작하기
        </TitleGrayTxt>
      </ButtonWrapper>
    </View>
  );
}

const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${YELLOW};
  padding: 18px 20px 18px 20px;
  margin: 0px 40px 0px 40px;
  align-items: center;
  border-radius: 30px;
`;
const TitleGrayTxt = styled.Text`
  ${SemiBold17};
  color: ${GRAY4};
`;

export default KakaoButton;

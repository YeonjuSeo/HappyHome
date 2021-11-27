import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import { SemiBold14, Bold14 } from "../../styles/typography";
import { PRIMARY, GRAY0 } from "../../styles/color";

import FullLogoImg from "../../assets/FullLogoImg.png";

export default function MiniPostCard({ showComplete, navigation }) {
  return (
    <PostInfoWrapper
      onPress={() => {
        navigation.navigate("Details");
      }}
    >
      <View style={{ width: 222 }}>
        <PostTitle numberOfLines={1} ellipsizeMode="tail">
          대현동 역세권 원룸 겨울방학만 단기로 빌려드립니다
        </PostTitle>
        <PostPrice>W100,000/주</PostPrice>
        {showComplete && (
          <CompleteButton
            onPress={() => {
              console.log("거래완료버튼 눌림");
            }}
          >
            <Text>거래완료</Text>
          </CompleteButton>
        )}
      </View>

      <PostImg source={FullLogoImg} />
    </PostInfoWrapper>
  );
}
const PostInfoWrapper = styled.TouchableOpacity`
  padding: 0 17px;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${GRAY0};
`;
const PostTitle = styled.Text`
  ${SemiBold14}
`;
const PostPrice = styled.Text`
  ${Bold14};
  color: ${PRIMARY};
  margin: 8px 0;
`;
const CompleteButton = styled.TouchableOpacity`
  width: 110px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${GRAY0};
`;
const PostImg = styled.Image`
  width: 83px;
  height: 86px;
`;

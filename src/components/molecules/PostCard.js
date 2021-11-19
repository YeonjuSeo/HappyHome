import React from "react";
import styled from "styled-components";

// components
import { View, Text, Image, TouchableOpacity } from "react-native";
import FullLogoImg from "../../assets/FullLogoImg.png";

// styles
import { SemiBold17, Medium12, Bold16 } from "../../styles/typography";
import { PRIMARY, GRAY2 } from "../../styles/color";

export default function PostCard({ navigation }) {
  return (
    <Wrapper
      onPress={() => {
        navigation.navigate("Details");
      }}
    >
      <LeftContainer>
        <Title numberOfLines={2} ellipsizeMode="tail">
          대현동 역세권 원룸 겨울 방학만 단기로 빌려드립니다
        </Title>
        <SubTitleWrapper>
          <SubTitle>서대문구 대현동</SubTitle>
          <SubTitle> · </SubTitle>
          {/* 언제까지 ~일전 으로 표시할 건지? */}
          <SubTitle>2일전</SubTitle>
        </SubTitleWrapper>

        <Distance>504m</Distance>
        <Price>₩ 100,000/주</Price>
      </LeftContainer>

      <StyledImg source={FullLogoImg} />
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  padding: 24px 0;
  display: flex;
  flex-direction: row;
  border-bottom-color: #e6e6e6;
  border-bottom-width: 1px;
  justify-content: space-between;
`;
const LeftContainer = styled.View`
  width: 169px;
`;
const Title = styled.Text`
  ${SemiBold17};
`;
const SubTitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const SubTitle = styled.Text`
  ${Medium12};
  margin: 8px 0 6px 0;
`;
const Distance = styled.Text`
  ${Medium12};
  color: ${GRAY2};
`;
const Price = styled.Text`
  ${Bold16};
  color: ${PRIMARY};
  margin-top: 37px;
`;
const StyledImg = styled.Image`
  width: 144px;
  height: 150px;
`;

import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil-react-native";
import { wishCoorState } from "../../states/User";

// components
import { View, Text, Image, TouchableOpacity } from "react-native";
import FullLogoImg from "../../assets/FullLogoImg.png";

// styles
import { SemiBold17, Medium12, Bold16 } from "../../styles/typography";
import { PRIMARY, GRAY2, GRAY0 } from "../../styles/color";

export default function PostCard({ navigation, post }) {
  return (
    <Wrapper
      isDealt={post.isDealt}
      onPress={() => {
        navigation.navigate("Details", {
          id: `${post.id}`,
          // id: "kakao:1980885517",
        });
      }}
    >
      <LeftContainer>
        <Title numberOfLines={2} ellipsizeMode="tail">
          {post.title}
        </Title>
        <SubTitleWrapper>
          <SubTitle>
            {post.location.split(" ")[1]} {post.location.split(" ")[2]}
          </SubTitle>
          <SubTitle> · </SubTitle>
          <SubTitle>
            {new Date(post.createdAt * 1000).getMonth() + 1}월{" "}
            {new Date(post.createdAt * 1000).getDate()}일
          </SubTitle>
        </SubTitleWrapper>

        <Distance>{post.distance}m</Distance>
        <Price>₩ {post.rentalFeeWeek}0,000/주 </Price>
      </LeftContainer>

      <StyledImg
        source={{
          uri: post.pictures[0],
        }}
      />
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
  background-color: ${(props) => (props.isDealt ? `${GRAY0}` : "white")};
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

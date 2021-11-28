import React from "react";
import styled from "styled-components";

// styles
import { SemiBold17, Medium12, Bold16 } from "../../styles/typography";
import { PRIMARY, GRAY2 } from "../../styles/color";

export default function PostCard({ navigation, post }) {
  return (
    <Wrapper
      isDealt={post.isDealt}
      onPress={() => {
        navigation.navigate("Details", {
          id: `${post.id}`,
        });
      }}
    >
      <LeftContainer>
        <Title numberOfLines={2} ellipsizeMode="tail" isDealt={post.isDealt}>
          {post.title}
        </Title>
        <SubTitleWrapper>
          <SubTitle isDealt={post.isDealt}>
            {post.location.split(" ")[1]} {post.location.split(" ")[2]}
          </SubTitle>
          <SubTitle isDealt={post.isDealt}> · </SubTitle>
          <SubTitle isDealt={post.isDealt}>
            {new Date(post.createdAt * 1000).getMonth() + 1}월{" "}
            {new Date(post.createdAt * 1000).getDate()}일
          </SubTitle>
        </SubTitleWrapper>

        <Distance isDealt={post.isDealt}>{post.distance}m</Distance>
        <Price isDealt={post.isDealt}>₩ {post.rentalFeeWeek}0,000/주 </Price>
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
  background-color: white;
`;
const LeftContainer = styled.View`
  width: 169px;
`;
const Title = styled.Text`
  ${SemiBold17};
  color: ${(props) => (props.isDealt ? "#b7b7b7" : "black")};
`;
const SubTitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const SubTitle = styled.Text`
  ${Medium12};
  margin: 8px 0 6px 0;
  color: ${(props) => (props.isDealt ? "#b7b7b7" : "black")};
`;
const Distance = styled.Text`
  ${Medium12};
  color: ${GRAY2};
  color: ${(props) => (props.isDealt ? "#b7b7b7" : "black")};
`;
const Price = styled.Text`
  ${Bold16};
  color: ${PRIMARY};
  margin-top: 37px;
  color: ${(props) => (props.isDealt ? "#b7b7b7" : "black")};
`;
const StyledImg = styled.Image`
  width: 144px;
  height: 150px;
`;

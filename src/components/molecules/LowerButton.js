import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
export default function LowerButton({ onPress, txt, icon }) {
  return (
    <PostButton onPress={onPress}>
      <Image source={icon} />
      <PostButtonText>{txt}</PostButtonText>
    </PostButton>
  );
}
const PostButton = styled.TouchableOpacity`
  background-color: #985de3;
  width: 107px;
  height: 61px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 45px;
  right: 16px;
`;
const PostButtonText = styled.Text`
  color: white;
  font-weight: 700;
`;

import React from "react";
import styled from "styled-components";
export default function LowerButton({ onPress, txt }) {
  return (
    <PostButton onPress={onPress}>
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

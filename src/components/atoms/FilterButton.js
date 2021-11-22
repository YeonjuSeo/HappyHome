import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, View, Button, Pressable } from "react-native";
export default function FilterButton({ txt }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <StyledTouchableOpacity
      onPress={() => {
        setIsSelected(!isSelected);
      }}
      isSelected={isSelected}
    >
      <Text>{isSelected ? "true" : "false"}</Text>
    </StyledTouchableOpacity>
  );
}

const StyledTouchableOpacity = styled.Pressable`
  background-color: pink;
  color: black;
  border: ${(props) =>
    props.isSelected ? "3px solid blue" : "3px solid pink"};
`;

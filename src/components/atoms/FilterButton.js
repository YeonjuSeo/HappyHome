import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, View, Button, Pressable } from "react-native";
import { PRIMARY, GRAY0 } from "../../styles/color";
export default function FilterButton({ txt }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Wrapper
      onPress={() => {
        setIsSelected(!isSelected);
      }}
      isSelected={isSelected}
    >
      <ButtonTxt isSelected={isSelected}>{txt}</ButtonTxt>
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  display: flex;
  margin: 0.2px;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 44px;
  background-color: white;
  border: ${(props) =>
    props.isSelected ? `1px solid ${PRIMARY}` : `1px solid ${GRAY0}`};
`;
const ButtonTxt = styled.Text`
  color: ${(props) => (props.isSelected ? `${PRIMARY}` : `black`)};
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Text, View, Button, Pressable } from "react-native";
import { PRIMARY, GRAY0 } from "../../styles/color";
export default function SelectButton({ onPress, txt, flag = 0 }) {
  const [isSelected, setIsSelected] = useState(false);
  function handlePressd() {
    onPress();
    setIsSelected(!isSelected);
  }

  return (
    <Wrapper
      key={txt}
      onPress={handlePressd}
      flag={flag}
      isSelected={isSelected}
    >
      <ButtonTxt key={txt} isSelected={isSelected}>
        {txt}
      </ButtonTxt>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  margin: 0.2px;
  justify-content: center;
  align-items: center;
  min-width: ${(props) => (props.flag > 0 && props.flag < 4 ? "48%" : "33%")};
  height: 44px;
  background-color: ${(props) =>
    props.isSelected ? `rgba(152,93,227,0.15)` : "white"};
  border: ${(props) =>
    props.isSelected ? `1px solid ${PRIMARY}` : `1px solid ${GRAY0}`};
`;
const ButtonTxt = styled.Text`
  color: ${(props) => (props.isSelected ? `${PRIMARY}` : `black`)};
`;

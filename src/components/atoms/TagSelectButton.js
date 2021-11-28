import React, { useState } from "react";
import styled from "styled-components/native";
import { PRIMARY, GRAY0 } from "../../styles/color";
import { Regular12 } from "../../styles/typography";
export default function SelectButton({ txt, onPress }) {
  const [isSelected, setIsSelected] = useState(false);
  function handlePressed() {
    onPress();
    setIsSelected(!isSelected);
  }
  return (
    <TagWrapper key={txt} onPress={handlePressed} isSelected={isSelected}>
      <TagTxt isSelected={isSelected}>{txt}</TagTxt>
    </TagWrapper>
  );
}

const TagWrapper = styled.TouchableOpacity`
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? `rgba(152,93,227,0.15)` : "white"};
  border: ${(props) =>
    props.isSelected ? `1px solid ${PRIMARY}` : `1px solid ${GRAY0}`};

  margin: 2px 2px;
  padding: 08px;
  border-radius: 14px;
`;
const TagTxt = styled.Text`
  ${Regular12};
  color: ${(props) => (props.isSelected ? `${PRIMARY}` : "black")};
`;

import React from "react";
import styled from "styled-components";
import { GRAY1 } from "../../styles/color";

export default function DateMarker({ date = "2021년 9월 25일" }) {
  return (
    <Wrapper>
      <DateTxt>{date}</DateTxt>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: #f5f5f5;
  margin: 19px 0 15px 0;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;
const DateTxt = styled.Text`
  color: ${GRAY1};
`;

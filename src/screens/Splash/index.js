import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, View } from "react-native";

import LogoImg from "../../assets/FullLogoImg.png";

export default function SplashScreen() {
  return (
    <Wrapper>
      <Image source={LogoImg} />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

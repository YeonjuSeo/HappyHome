import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

import LogoImg from "../../assets/FullLogoImg.png";
import bgImg1 from "../../assets/splashBG1.png";
import bgImg2 from "../../assets/splashBG2.png";
import bgImg3 from "../../assets/splashBG3.png";

export default function SplashScreen() {
  return (
    <Wrapper>
      <Image source={LogoImg} />
      <Image style={{ position: "absolute", bottom: 0 }} source={bgImg1} />
      <Image
        style={{ position: "absolute", bottom: 0, left: 0 }}
        source={bgImg2}
      />
      <Image
        style={{ position: "absolute", top: 80, right: 0 }}
        source={bgImg3}
      />
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

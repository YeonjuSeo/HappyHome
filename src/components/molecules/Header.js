import React from "react";
import styled from "styled-components/native";
import { Image, View, TouchableOpacity } from "react-native";
import Chevron from "../../assets/HeaderChevron.png";
export default function Header({ navigation, addr }) {
  return (
    <HeaderWrapper>
      <HeaderTitleWrapper
        onPress={() =>
          navigation.navigate("LocationSearch", {
            prev: "Home",
          })
        }
      >
        <HeaderTitleTxt>{addr}</HeaderTitleTxt>
      </HeaderTitleWrapper>

      <Image source={Chevron} />
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 55px;
`;
const HeaderTitleWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const HeaderTitleTxt = styled.Text`
  font-weight: bold;
  color: black;

  font-size: 17px;
  text-align: center;
  text-align-vertical: center;
  align-self: center;
`;

import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import BackButton from "../atoms/BackButton";

export default function HeaderTemplate({
  navigation,
  title,
  left,
  right,
  style,
  txtStyle,
}) {
  return (
    <HeaderWrapper style={style}>
      {left ? (
        <BackButton navigation={navigation} />
      ) : (
        <View style={{ width: 28, height: 28 }}></View>
      )}
      <HeaderTitleWrapper>
        <HeaderTitleTxt txtStyle={txtStyle}>{title}</HeaderTitleTxt>
      </HeaderTitleWrapper>

      {right ? right : <View style={{ width: 28, height: 28 }}></View>}
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: 95px;
  position: relative;
  padding: 0 11px 15px 11px;
  ${(props) => props.style}
  width:100%;
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
  display: flex;
  font-size: 17px;
  text-align: center;
  ${(props) => props.txtStyle};
`;

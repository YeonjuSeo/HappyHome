import React from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import Chevron from "../../assets/HeaderChevron.png";
import { PRIMARY } from "../../styles/color";
import MarkerIcon from "../../assets/marker.png";

export default function Header({ navigation, addr }) {
  return (
    <HeaderWrapper>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={{ marginRight: 4, width: 24, height: 24 }}
          source={MarkerIcon}
        />
        <HeaderTitleWrapper
          onPress={() =>
            navigation.navigate("LocationSearch", {
              prev: "Home",
            })
          }
        >
          <HeaderTitleTxt>{addr}</HeaderTitleTxt>
        </HeaderTitleWrapper>

        <Image style={{ marginLeft: 4 }} source={Chevron} />
      </View>
      <MyWrapper
        onPress={() => {
          navigation.navigate("MyPage");
        }}
      >
        <MyPageTxt>MY</MyPageTxt>
      </MyWrapper>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  height: 95px;
  padding-bottom: 15px;
  position: relative;
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
const MyWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 17px;
  bottom: 15px;
`;
const MyPageTxt = styled.Text`
  color: ${PRIMARY};
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
`;

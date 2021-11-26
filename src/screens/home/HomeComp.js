import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, Image } from "react-native";
import styled, { css } from "styled-components/native";
import Header from "../../components/molecules/Header";
import PostCard from "../../components/molecules/PostCard";
import FilterIcon from "../../assets/Filter.png";
import LowerButton from "../../components/molecules/LowerButton";
import Carousel from "../../components/molecules/Carousel";
import WriteIcon from "../../assets/pencil.png";
import { SearchButton } from "../../components/atoms/SearchBar";
import { SearchBar } from "react-native-elements";
import { Medium13 } from "../../styles/typography";
import { GRAY3 } from "../../styles/color";

import { wishAddrState } from "../../states/User";

import { useRecoilValue } from "recoil-react-native";

export default function HomeComp({ navigation }) {
  const wishAddr = useRecoilValue(wishAddrState);
  const [isRecentOrder, setIsRecentOrder] = useState(true);
  return (
    <Wrapper>
      <Header navigation={navigation} addr={wishAddr} />
      <Carousel height={150} isIdxVisible={false} />

      <PaddingWrapper>
        <SearchBar
          placeholder={`${wishAddr}의 어떤 집을 찾고 계세요?`}
          containerStyle={{
            backgroundColor: "white",
            marginTop: 18,
            marginBottom: 20,
            height: 50,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{ backgroundColor: "white" }}
          leftIconContainerStyle={{ backgroundColor: "white" }}
          inputStyle={{
            fontWeight: "500",
            fontSize: 15,
            lineHeight: 18,
            color: GRAY3,
          }}
          searchIcon={<SearchButton navigation={navigation} />}
        />
        <SmallMenuWrapper>
          <TouchableOpacity
            onPress={() => {
              setIsRecentOrder(!isRecentOrder);
            }}
          >
            <OrderButtonTxt>
              {isRecentOrder ? "최신순" : "거리순"}
            </OrderButtonTxt>
          </TouchableOpacity>

          <Text> | </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
          >
            <Image source={FilterIcon} />
          </TouchableOpacity>
        </SmallMenuWrapper>
        <View>
          <PostCard navigation={navigation} />
        </View>
      </PaddingWrapper>

      <LowerButton
        icon={WriteIcon}
        onPress={() => {
          navigation.navigate("WritePost");
        }}
        txt={"매물있어요"}
      />
    </Wrapper>
  );
}
const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;
const PaddingWrapper = styled.View`
  padding: 0 16px;
`;

const OrderButtonTxt = styled.Text`
  ${Medium13};
  color: ${GRAY3};
`;
const SmallMenuWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

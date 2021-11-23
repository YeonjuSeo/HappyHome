import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, Image } from "react-native";
import styled from "styled-components/native";
import Header from "../../components/molecules/Header";
import PostCard from "../../components/molecules/PostCard";
import FilterIcon from "../../assets/Filter.png";
import LowerButton from "../../components/molecules/LowerButton";
import Carousel from "../../components/molecules/Carousel";
import WriteIcon from "../../assets/pencil.png";

import { wishAddrState } from "../../states/User";

import { useRecoilValue } from "recoil-react-native";

export default function HomeComp({ navigation }) {
  const wishAddr = useRecoilValue(wishAddrState);
  const [isRecentOrder, setIsRecentOrder] = useState(true);
  return (
    <Wrapper>
      <Header navigation={navigation} addr={wishAddr} />
      <Carousel height={150} isIdxVisible={false} />
      <SearchBar placeholder={`${wishAddr}의 어떤 집을 찾고 계세요?`} />
      <PaddingWrapper>
        <SmallMenuWrapper>
          <Button
            title={isRecentOrder ? "최신순" : "거리순"}
            onPress={() => {
              setIsRecentOrder(!isRecentOrder);
            }}
          />
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
const SearchBar = styled.TextInput`
  background-color: white;
  border: 1px solid #ededed;
  height: 50px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  margin: 18px 0 20px 0;
  padding: 0 9px;
`;

const SmallMenuWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

import React from "react";
import styled from "styled-components/native";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import HeaderTemplate from "../../components/template/HeaderTemplate";
import FilterIcon from "../../assets/Filter.png";
import PostCard from "../../components/molecules/PostCard";

export default function ResultScreen({ navigation }) {
  return (
    <Wrapper>
      <HeaderTemplate
        navigation={navigation}
        title={"검색 결과"}
        left={true}
        right={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
          >
            <Image source={FilterIcon} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <PostCard navigation={navigation} />
      </ScrollView>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: white;
  flex: 1;
  padding: 0 16px;
`;

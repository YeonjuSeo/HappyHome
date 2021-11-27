import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import HeaderTemplate from "../../components/template/HeaderTemplate";
import FilterIcon from "../../assets/Filter.png";
import PostCard from "../../components/molecules/PostCard";
import { wishAddrState, wishCoorState } from "../../states/User";
import { useRecoilValue } from "recoil-react-native";
import getEnvVars from "../../settings/environment";

export default function ResultScreen({ navigation, route }) {
  const { apiUrl } = getEnvVars();
  const [postObj, setPostObj] = useState();
  const wishAddr = useRecoilValue(wishAddrState);
  const wishCoor = useRecoilValue(wishCoorState);
  useEffect(() => {
    axios
      .post(`${apiUrl}/api/posts/created`, {
        xLocation: wishCoor.x,
        yLocation: wishCoor.y,
      })
      .then((res) => {
        const { data } = res.data;
        setPostObj(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Wrapper>
      <HeaderTemplate
        navigation={navigation}
        title={route.params.keyword}
        left={true}
        right={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
          >
            <Image style={{ width: 22, height: 22 }} source={FilterIcon} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {postObj &&
          postObj.map((post, i) => {
            if (i < 6 && !post.isDealt)
              return <PostCard navigation={navigation} post={post} />;
          })}
      </ScrollView>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: white;
  flex: 1;
  padding: 0 16px;
`;

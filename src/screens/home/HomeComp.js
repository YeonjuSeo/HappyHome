import React, { useEffect, useState } from "react";
import axios from "axios";
import { wishAddrState, wishCoorState } from "../../states/User";
import { useRecoilValue } from "recoil-react-native";
import getEnvVars from "../../settings/environment";

// styles
import styled, { css } from "styled-components/native";
import { Medium13 } from "../../styles/typography";
import { GRAY3 } from "../../styles/color";

// components
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Header from "../../components/molecules/Header";
import PostCard from "../../components/molecules/PostCard";
import FilterIcon from "../../assets/Filter.png";
import LowerButton from "../../components/molecules/LowerButton";
import Carousel from "../../components/molecules/Carousel";
import WriteIcon from "../../assets/pencil.png";
import { SearchButton } from "../../components/atoms/SearchBar";
import { SearchBar } from "react-native-elements";
import bgImg1 from "../../assets/splashBG1.png";
import bgImg2 from "../../assets/splashBG2.png";
import { useFocusEffect } from "@react-navigation/core";

const bannerData = [
  "https://postfiles.pstatic.net/MjAyMTExMjZfODAg/MDAxNjM3OTIzOTc4MjE1.qOyAYkSMSFZ7z0JmGnSSE-yaabDNe3W2GoHUzN7RkfIg.Rqn2nZPvPV6yVrA2KvS2oguv8jRo0KDufyNp8LENlAkg.PNG.kados22/banner.png?type=w773",
];

export default function HomeComp({ navigation }) {
  const wishAddr = useRecoilValue(wishAddrState);
  const wishCoor = useRecoilValue(wishCoorState);
  const [keyword, setKeyword] = useState();
  const [isRecentOrder, setIsRecentOrder] = useState(true);
  const [postObj, setPostObj] = useState();
  const [isFiltered, setIsFiltered] = useState(false);

  const { apiUrl } = getEnvVars();

  function orderRequest(recentOrder) {
    if (recentOrder) {
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
    } else {
      axios
        .post(`${apiUrl}/api/posts/distance`, {
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
    }
  }
  useFocusEffect(() => {
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
  })

  useEffect(() => {
    orderRequest(isRecentOrder);
  }, [isRecentOrder]);

  return (
    <Wrapper>
      <Header navigation={navigation} addr={wishAddr} />
      <ScrollView>
        <Carousel data={bannerData} height={150} isIdxVisible={false} />
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
            onChangeText={(value) => {
              setKeyword(value);
              console.log(value);
            }}
            value={keyword}
            clearIcon={false}
            searchIcon={
              <SearchButton navigation={navigation} keyword={keyword} />
            }
          />
          <SmallMenuWrapper>
            <TouchableOpacity
              onPress={() => {
                const now = !isRecentOrder;
                setIsFiltered(false);
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
              <Image style={{ width: 22, height: 22 }} source={FilterIcon} />
            </TouchableOpacity>
          </SmallMenuWrapper>
          <View>
            {postObj &&
              !isFiltered &&
              postObj.map((item, i) => (
                <PostCard
                  key={item.title}
                  navigation={navigation}
                  post={item}
                />
              ))}
            {postObj &&
              isFiltered &&
              postObj.map((post, i) => {
                if (i < 6 && !post.isDealt)
                  return <PostCard navigation={navigation} post={post} />;
              })}
          </View>
        </PaddingWrapper>
      </ScrollView>

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
const LoadingWrapper = styled.View`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

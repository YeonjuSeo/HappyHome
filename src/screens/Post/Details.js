import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import getEnvVars from "../../settings/environment";
import { useRecoilValue } from "recoil-react-native";
import { wishCoorState } from "../../states/User";
import { userInfoState } from "../../states/UserInfo";
import {
  userGenderType,
  userSmokingType,
  roomFeatureType,
  roomOptionType,
} from "../Home/ItemOptionData";

// components
import { ScrollView, View, Text, Image } from "react-native";
import LowerButton from "../../components/molecules/LowerButton";
import Carousel from "../../components/molecules/Carousel";
import HeaderTemplate from "../../components/template/HeaderTemplate";

// assets
import ChatIcon from "../../assets/chat.png";
import WifiIcon from "../../assets/wifi.png";
import LaundaryIcon from "../../assets/laundary.png";
import MicrowaveIcon from "../../assets/microwave.png";
import AirCondIcon from "../../assets/air-conditioner.png";

// styles
import {
  Medium12,
  Medium13,
  Medium14,
  SemiBold17,
  SemiBold14,
  SemiBold11,
  Bold16,
  Regular14,
} from "../../styles/typography";
import { PRIMARY, GRAY4, GRAY2, GRAY1, GRAY0 } from "../../styles/color";

const roomOptionIconData = {
  와이파이: WifiIcon,
  세탁기: LaundaryIcon,
  전자렌지: MicrowaveIcon,
  에어컨: AirCondIcon,
};

export default function DetailsScreen({ navigation, route }) {
  const { apiUrl } = getEnvVars();
  const [post, setPost] = useState();
  let address;
  const wishCoor = useRecoilValue(wishCoorState);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    // console.log("id: ", route.params.id);
    axios
      .post(`${apiUrl}/api/posts/postid`, {
        xLocation: wishCoor.x,
        yLocation: wishCoor.y,
        post_uid: route.params.id,
      })
      .then((res) => {
        const { data } = res.data;
        setPost(data);
        // console.log(data);
        address = data.location.split(" ");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {post ? (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <HeaderTemplate
            navigation={navigation}
            title={""}
            left={true}
            color={"transparent"}
            style={
              "position:absolute; z-index:3000; background-color:transparent;"
            }
          />
          <ScrollView>
            <View>
              <Carousel height={236} isIdxVisible={true} data={post.pictures} />
              <UpperWrapper>
                <SubTitle>
                  {post.location.split(" ")[1]} {post.location.split(" ")[2]} ·{" "}
                  {new Date(post.createdAt * 1000).getMonth() + 1}월{" "}
                  {new Date(post.createdAt * 1000).getDate()}일
                </SubTitle>
                <Title>{post.title} </Title>
                <Distance>{post.distance}m</Distance>
                <Description>{post.description}</Description>
              </UpperWrapper>
              <LowerWrapper>
                <LargeSectionTitle>거래정보</LargeSectionTitle>
                <SmallSectionWrapper>
                  <SmallSectionTitle>가격</SmallSectionTitle>
                  <SmallBorderSectionContentWrapper>
                    <Price>W{post.rentalFeeWeek}0,000/주</Price>
                    <Price style={{ paddingTop: 4, marginBottom: 8 }}>
                      W{post.rentalFeeMonth}0,000/월
                    </Price>
                    <Text style={[Regular14, { color: GRAY1 }]}>
                      *관리비 포함
                    </Text>
                  </SmallBorderSectionContentWrapper>
                </SmallSectionWrapper>
                <SmallSectionWrapper>
                  <SmallSectionTitle>전대 기간</SmallSectionTitle>
                  <SmallBorderSectionContentWrapper>
                    <Text style={Regular14}>
                      {new Date(post.residentStartDate * 1000).getMonth() + 1}월{" "}
                      {new Date(post.residentStartDate * 1000).getDate()}일 ~{" "}
                      {new Date(post.residentFinishDate * 1000).getMonth() + 1}
                      월 {new Date(post.residentFinishDate * 1000).getDate()}일
                    </Text>
                  </SmallBorderSectionContentWrapper>
                </SmallSectionWrapper>
                <LargeSectionTitle>방 정보</LargeSectionTitle>
                <SmallSectionWrapper>
                  <SmallSectionTitle>주소</SmallSectionTitle>

                  <SmallBorderSectionContentWrapper>
                    <Text style={Regular14}>{post.location}</Text>
                  </SmallBorderSectionContentWrapper>
                </SmallSectionWrapper>
                <SmallSectionWrapper>
                  <SmallSectionTitle>매물 기본정보</SmallSectionTitle>
                  <FlexRowWrapper>
                    <BorderContentWrapper>
                      <Text style={Regular14}>{post.buildingType}</Text>
                    </BorderContentWrapper>
                    <BorderContentWrapper>
                      <Text style={Regular14}>{post.floors}</Text>
                    </BorderContentWrapper>
                    <BorderContentWrapper>
                      <Text style={Regular14}>{post.roomType}</Text>
                    </BorderContentWrapper>
                  </FlexRowWrapper>
                </SmallSectionWrapper>
                <SmallSectionWrapper>
                  <SmallSectionTitle>방 옵션</SmallSectionTitle>

                  <FlexRowWrapper style={{ alignItems: "flex-end" }}>
                    {post.options.map((el, i) => (
                      <RoomOptionItemWrapper>
                        {/* <Image
                          style={{ height: 41 }}
                          source={roomOptionIconData.roomOptionType[el]}
                        /> */}
                        <Text
                          style={[SemiBold11, { color: PRIMARY, marginTop: 7 }]}
                        >
                          {roomOptionType[el]}
                        </Text>
                      </RoomOptionItemWrapper>
                    ))}
                  </FlexRowWrapper>
                </SmallSectionWrapper>
                <SmallSectionWrapper>
                  <SmallSectionTitle>특징</SmallSectionTitle>
                  <FlexRowWrapper>
                    {post.features.map((item, i) => (
                      <TagWrapper key={item}>
                        <TagTxt>#{roomFeatureType[item]}</TagTxt>
                      </TagWrapper>
                    ))}
                  </FlexRowWrapper>
                </SmallSectionWrapper>
                <LargeSectionTitle>기타</LargeSectionTitle>
                <SmallSectionWrapper>
                  <SmallSectionTitle>희망 전차인 유형</SmallSectionTitle>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <BorderContentWrapper>
                      <Text style={Regular14}>
                        {userGenderType[post.gender]}
                      </Text>
                    </BorderContentWrapper>
                    <BorderContentWrapper>
                      <Text style={Regular14}>
                        {userSmokingType[post.smoking]}
                      </Text>
                    </BorderContentWrapper>
                  </View>
                </SmallSectionWrapper>
              </LowerWrapper>
            </View>
          </ScrollView>
          <FixedFooter>
            <Text style={Medium14}>
              {post.nickname} {post.name}
            </Text>
            <Text style={[Medium14, { color: GRAY1, marginTop: 9 }]}>
              전대인
            </Text>
            {userInfo.uid !== route.params.id && (
              <LowerButton
                onPress={() => {
                  navigation.navigate("ChattingRoom", {
                    owner: {
                      nickname: post.nickname,
                      name: post.name,
                      id: route.params.id,
                    },
                  });
                }}
                txt="채팅 보내기"
                icon={ChatIcon}
              />
            )}
          </FixedFooter>
        </View>
      ) : null}
    </>
  );
}
const UpperWrapper = styled.View`
  padding: 19px 16px 26px 16px;
  background-color: white;
  margin-bottom: 10px;
`;
const LowerWrapper = styled.View`
  background-color: white;
  padding: 25px 16px 0 16px;
`;
const FlexRowWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const LargeSectionTitle = styled.Text`
  ${SemiBold17};
  line-height: 20px;
`;
const SmallSectionWrapper = styled.View`
  margin: 25px 0;
`;
const SmallSectionTitle = styled.Text`
  ${SemiBold14};
  margin-bottom: 10px;
`;
const SmallBorderSectionContentWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0 14px 0;
  border-width: 1px;
  border-color: ${GRAY0};
`;
const BorderContentWrapper = styled.View`
  height: 44px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${GRAY0};
`;
const RoomOptionItemWrapper = styled.View`
  align-items: center;
  margin: 10px 16px 0 16px;
  overflow: visible;
`;
const TagWrapper = styled.View`
  align-self: flex-start;
  height: 28px;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  margin: 2px 2px;
  padding: 6px;
`;
const TagTxt = styled.Text`
  ${Medium13};
  color: ${GRAY4};
`;
const SubTitle = styled.Text`
  ${Medium12}
`;
const Title = styled.Text`
  ${SemiBold17}
  margin: 4px 0 7px 0;
`;
const Distance = styled.Text`
  ${Medium12};
  color: ${GRAY2};
`;
const Description = styled.Text`
  ${Regular14};
  line-height: 22px;
  margin-top: 12px;
`;
const Price = styled.Text`
  ${Bold16};
  color: ${PRIMARY};
`;
const FixedFooter = styled.View`
  background-color: white;
  border-top-color: #d7d7d7;
  border-width: 1px;
  height: 124px;
  width: 100%;
  padding: 14px 16px 0 16px;
`;

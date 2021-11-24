import React from "react";
import styled from "styled-components";
import { ScrollView, View, Text, Image } from "react-native";

import LowerButton from "../../components/molecules/LowerButton";
import Carousel from "../../components/molecules/Carousel";
import ChatIcon from "../../assets/chat.png";
import HeaderTemplate from "../../components/template/HeaderTemplate";

// styles
import {
  Medium12,
  Medium14,
  SemiBold17,
  SemiBold14,
  Bold16,
  Regular14,
} from "../../styles/typography";
import { PRIMARY, GRAY2, GRAY1, GRAY0 } from "../../styles/color";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderTemplate
        navigation={navigation}
        title={""}
        left={true}
        color={"transparent"}
        style={"position:absolute; z-index:3000; background-color:transparent;"}
      />
      <ScrollView>
        <View>
          <Carousel height={236} isIdxVisible={true} />
          <UpperWrapper>
            <SubTitle>서대문구 대현동 · 2일전</SubTitle>
            <Title>대현동 역세권 원룸 겨울방학만 단기로 </Title>
            <Distance>504m</Distance>
            <Description>
              근처 대학 학생인데 방학기간동안 시험준비로 지방 본가에 내려가게
              되어 두 달동안 들어오실 분 구합니다. 방에 있는 세탁기랑 전자레인지
              등 다 사용하셔도 되고요. 궁금하신 것 있으시면 메세지 남겨주세요.
            </Description>
          </UpperWrapper>
          <LowerWrapper>
            <LargeSectionTitle>거래정보</LargeSectionTitle>
            <SmallSectionWrapper>
              <SmallSectionTitle>가격</SmallSectionTitle>
              <SmallBorderSectionContentWrapper>
                <Price>W100,000/주</Price>
                <Price style={{ paddingTop: 4, marginBottom: 8 }}>
                  W300,000/월
                </Price>
                <Text style={[Regular14, { color: GRAY1 }]}>*관리비 포함</Text>
              </SmallBorderSectionContentWrapper>
            </SmallSectionWrapper>
            <SmallSectionWrapper>
              <SmallSectionTitle>전대 기간</SmallSectionTitle>
            </SmallSectionWrapper>
            <LargeSectionTitle>방 정보</LargeSectionTitle>
            <SmallSectionWrapper>
              <SmallSectionTitle>주소</SmallSectionTitle>
              <SmallBorderSectionContentWrapper>
                <Text style={Regular14}>서울시 서대문구 대현동 11-1</Text>
              </SmallBorderSectionContentWrapper>
            </SmallSectionWrapper>
            <SmallSectionWrapper>
              <SmallSectionTitle>매물 기본정보</SmallSectionTitle>
              <SmallBorderSectionContentWrapper>
                <Text style={Regular14}>빌라</Text>
                <Text style={Regular14}>지상층</Text>
                <Text style={Regular14}>오픈형</Text>
              </SmallBorderSectionContentWrapper>
            </SmallSectionWrapper>
            <SmallSectionWrapper>
              <SmallSectionTitle>방 옵션</SmallSectionTitle>
              <SmallBorderSectionContentWrapper>
                <Text style={Regular14}>아이콘과 옵션 상태가 들어갑니다</Text>
              </SmallBorderSectionContentWrapper>
            </SmallSectionWrapper>
            <SmallSectionWrapper>
              <SmallSectionTitle>특징</SmallSectionTitle>
              <SmallBorderSectionContentWrapper>
                <Text style={Regular14}>해시태그 정보가 들어갑니다</Text>
              </SmallBorderSectionContentWrapper>
            </SmallSectionWrapper>
            <LargeSectionTitle>기타</LargeSectionTitle>
            <SmallSectionWrapper>
              <SmallSectionTitle>희망 전차인 유형</SmallSectionTitle>
              <SmallBorderSectionContentWrapper>
                <Text style={Regular14}>
                  성별무관 흡연무관 버튼이 들어갑니다
                </Text>
              </SmallBorderSectionContentWrapper>
            </SmallSectionWrapper>
          </LowerWrapper>
        </View>
      </ScrollView>
      <FixedFooter>
        <Text style={Medium14}>대현동새내기 김지원</Text>
        <Text style={[Medium14, { color: GRAY1, marginTop: 9 }]}>전대인</Text>
        <LowerButton
          onPress={() => {
            navigation.navigate("ChattingRoom");
          }}
          txt="채팅 보내기"
          icon={ChatIcon}
        />
      </FixedFooter>
    </View>
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
  margin-bottom: 120px;
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
  margin-bottom: 16px;
`;
const SmallBorderSectionContentWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0 14px 0;
  border-width: 1px;
  border-color: ${GRAY0};
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

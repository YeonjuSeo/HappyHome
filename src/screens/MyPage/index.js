import React from "react";
import styled from "styled-components";
import { ScrollView, View, Text } from "react-native";
import { SemiBold17, SemiBold14, Regular14 } from "../../styles/typography";

import MiniPostCard from "../../components/molecules/MiniPostCard";
import ChatCard from "../../components/molecules/ChatCard";
import HeaderTemplate from "../../components/template/HeaderTemplate";
import { PRIMARY, GRAY0 } from "../../styles/color";

export default function MyPageScreen({ navigation }) {
  return (
    <Wrapper>
      <HeaderTemplate
        navigation={navigation}
        title="MY"
        left={true}
        style={`background-color:${PRIMARY};`}
        txtStyle={"color:white;"}
      />
      <UserInfoWrapper>
        <UserInfoName>대현동불주먹 김지원</UserInfoName>
        <UserInfoEmail>jiwonkim@gmail.com</UserInfoEmail>
      </UserInfoWrapper>

      <SectionWrapper>
        <SectionTitle>내가 쓴 글</SectionTitle>
        <MiniPostCard navigation={navigation} showComplete={false} />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>채팅</SectionTitle>
        <View>
          <ChatCard
            title="대현동 역세권 원룸 겨울방학만 단기로… "
            member="역마낀 최지민"
            recentMsg="안녕하세요~! 혹시 다른 각도의 사진도 볼 수 있을까요?"
          />
          <ChatCard
            title="3주동안 잠시 방 빌리실 분 구해요/부산역"
            member="부산청년 박지언"
            recentMsg="안녕하세요."
          />
        </View>
      </SectionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.ScrollView`
  background-color: white;
`;
const UserInfoWrapper = styled.View`
  background-color: ${PRIMARY};
  padding: 0 23px 16px 23px;
  height: 90px;
  justify-content: flex-end;
`;
const UserInfoName = styled.Text`
  color: white;
  ${SemiBold14};
  margin-bottom: 5px;
`;
const UserInfoEmail = styled.Text`
  ${Regular14};
  color: white;
`;
const SectionWrapper = styled.View`
  margin-top: 28px;
`;
const SectionTitle = styled.Text`
  ${SemiBold17};
  margin-bottom: 11px;
`;

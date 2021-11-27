import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  ScrollView,
  View,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SemiBold17, SemiBold14, Regular14 } from "../../styles/typography";

import MiniPostCard from "../../components/molecules/MiniPostCard";
import ChatCard from "../../components/molecules/ChatCard";
import HeaderTemplate from "../../components/template/HeaderTemplate";
import { PRIMARY, GRAY0 } from "../../styles/color";

import getEnvVars from "../../settings/environment";
import { userInfoState } from "../../states/UserInfo";
import { useRecoilValue } from "recoil-react-native";
import { wishCoorState } from "../../states/User";
export default function MyPageScreen({ navigation }) {
  const userInfo = useRecoilValue(userInfoState);
  const { apiUrl } = getEnvVars();
  const [showModal, setShowModal] = useState(false);
  const wishCoor = useRecoilValue(wishCoorState);
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
        <UserInfoName>
          {userInfo.isNicknameSettingDone && userInfo.nickname} {userInfo.name}
        </UserInfoName>
        <UserInfoEmail>{userInfo.email}</UserInfoEmail>
      </UserInfoWrapper>

      <SectionWrapper>
        <SectionTitle>내가 쓴 글</SectionTitle>
        {/* <Button
          title="거래완료"
          onPress={() => {
            setShowModal(true);
          }}
        /> */}

        <MiniPostCard
          navigation={navigation}
          showComplete={false}
          id={userInfo.uid}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>채팅</SectionTitle>
        <View>
          {userInfo.uid == "kakao:1980885517" && (
            <ChatCard
              navigation={navigation}
              title="신촌 근처 방 내놓아요"
              member={{ nickname: "역마낀", name: "최지민", id: "kakao:27" }}
              recentMsg="안녕하세요~! 혹시 다른 각도의 사진도 볼 수 있을까요?"
            />
          )}
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
  margin-left: 16px;
`;

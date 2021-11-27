import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";

import { SemiBold14, Bold14 } from "../../styles/typography";
import { PRIMARY, GRAY0 } from "../../styles/color";

import { useRecoilValue } from "recoil-react-native";
import { userInfoState } from "../../states/UserInfo";

import { BubbleYou, BubbleMe, ImgBubble } from "../../components/atoms/Bubble";
import DateMarker from "../../components/atoms/DateMarker";
import ChatInput from "../../components/molecules/ChatInput";
import MiniPostCard from "../../components/molecules/MiniPostCard";
import HeaderTemplate from "../../components/template/HeaderTemplate";

export default function ChattingRoom({ navigation, route }) {
  const date = new Date();
  const userInfo = useRecoilValue(userInfoState);
  const [input, setInput] = useState("");

  return (
    <Wrapper>
      <HeaderTemplate
        navigation={navigation}
        title={`${route.params.owner.nickname} ${route.params.owner.name}`}
        left={true}
      />
      <MiniPostCard
        navigation={navigation}
        showComplete={route.params.owner.id == userInfo.uid}
        id={route.params.owner.id}
      />

      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1, height: "100%" }}
      >
        <ChatView>
          <DateMarker />

          <View>
            <BubbleYou
              txt={"안녕하세요~! 혹시 다른 각도의 사진도 볼 수 있을까요?"}
            />
            <BubbleMe txt={"안녕하세요! 사진 보내드릴게요."} />
            <ImgBubble from={"ME"} />
            {input !== "" && (
              <View>
                <DateMarker
                  date={`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`}
                />
                <BubbleMe now={true} txt={input} />
              </View>
            )}
          </View>
        </ChatView>
        <ChatInput setInput={setInput} />
      </KeyboardAvoidingView>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: white;
  flex: 1;
`;

const ChatView = styled.ScrollView`
  background-color: white;
  padding: 0 11px;
`;

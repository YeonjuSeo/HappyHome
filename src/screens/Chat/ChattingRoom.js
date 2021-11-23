import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

import { SemiBold14, Bold14 } from "../../styles/typography";
import { PRIMARY, GRAY0 } from "../../styles/color";

import { BubbleYou, BubbleMe, ImgBubble } from "../../components/atoms/Bubble";
import DateMarker from "../../components/atoms/DateMarker";
import ChatInput from "../../components/molecules/ChatInput";
import MiniPostCard from "../../components/molecules/MiniPostCard";

export default function ChattingRoom({ navigation }) {
  const date = new Date();
  const [input, setInput] = useState("");
  return (
    <Wrapper>
      <MiniPostCard navigation={navigation} showComplete={true} />

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

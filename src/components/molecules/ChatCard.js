import React from "react";
import styled from "styled-components";

import { GRAY0, GRAY1 } from "../../styles/color";
import { SemiBold13, SemiBold14, Medium12 } from "../../styles/typography";

export default function ChatCard({
  navigation,
  title,
  member,
  recentMsg,
  dealt,
  setDealt,
}) {
  return (
    <Wrapper
      onPress={() => {
        navigation.navigate("ChattingRoom", {
          dealt: dealt,
          setDealt: setDealt,
          owner: {
            nickname: member.nickname,
            name: member.name,
            id: member.id,
          },
        });
      }}
    >
      <ChatTitle>{title}</ChatTitle>
      <ChatMem>
        {member.nickname} {member.name}
      </ChatMem>
      <RecentMsg>{recentMsg}</RecentMsg>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  height: 112px;
  justify-content: center;
  padding: 0 16px;
  border-top-width: 1px;
  border-top-color: ${GRAY0};
`;

const ChatTitle = styled.Text`
  ${SemiBold14};
`;
const ChatMem = styled.Text`
  ${SemiBold13};
  color: ${GRAY1};
`;
const RecentMsg = styled.Text`
  ${Medium12};
  color: ${GRAY1};
  margin-top: 12px;
`;

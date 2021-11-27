import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
} from "react-native";

import { SemiBold14, Regular14 } from "../../styles/typography";
import { PRIMARY, GRAY0 } from "../../styles/color";

import { useRecoilValue, useRecoilState } from "recoil-react-native";
import { userInfoState } from "../../states/UserInfo";
import { BubbleYou, BubbleMe, ImgBubble } from "../../components/atoms/Bubble";
import DateMarker from "../../components/atoms/DateMarker";
import ChatInput from "../../components/molecules/ChatInput";
import MiniPostCard from "../../components/molecules/MiniPostCard";
import HeaderTemplate from "../../components/template/HeaderTemplate";
import axios from "axios";
import getEnvVars from "../../settings/environment";

const { apiUrl } = getEnvVars();

export default function ChattingRoom({ navigation, route }) {
  const date = new Date();
  const userInfo = useRecoilValue(userInfoState);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <Wrapper>
      <HeaderTemplate
        navigation={navigation}
        title={`${route.params.owner.nickname} ${route.params.owner.name}`}
        left={true}
      />
      <MiniPostCard
        navigation={navigation}
        // !== 으로 수정하기
        showComplete={route.params.owner.id == userInfo.uid}
        id={route.params.owner.id}
        setShowModal={setShowModal}
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
            <BubbleMe txt={"메시지"} />
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
      {showModal && (
        <ModalWrapper>
          <ModalContentWrapper>
            <ModalTxt>반드시 전대차 계약서를 작성해 안전하게</ModalTxt>
            <ModalTxt>거래를 진행해주세요. 거래를 완료하시겠습니까?</ModalTxt>
          </ModalContentWrapper>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <ModalButton
              type="cancel"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ModalButtonTxt>취소</ModalButtonTxt>
            </ModalButton>
            <ModalButton
              onPress={() => {
                Alert.alert("거래완료되었습니다");
                axios
                  .patch(`${apiUrl}/api/posts/dealt`)
                  .then((res) => {
                    console.log(res);
                    route.params.setDealt(true);
                    setShowModal(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              type="ok"
            >
              <ModalButtonTxt>확인</ModalButtonTxt>
            </ModalButton>
          </View>
        </ModalWrapper>
      )}
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
const ModalWrapper = styled.View`
  width: 90%;
  height: 163px;
  border: 1px solid ${GRAY0};
  position: absolute;
  background-color: white;
  z-index: 3000;
  justify-content: space-between;
  align-self: center;
  top: 350px;
`;
const ModalContentWrapper = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  height: 112px;
  padding: 0 24px;
`;
const ModalTxt = styled.Text`
  ${Regular14};
`;
const ModalButton = styled.TouchableOpacity`
  width: 50%;
  height: 51px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.type == "ok" ? `${PRIMARY}` : "#b4b4b4"};
`;
const ModalButtonTxt = styled.Text`
  ${SemiBold14};
  color: white;
`;

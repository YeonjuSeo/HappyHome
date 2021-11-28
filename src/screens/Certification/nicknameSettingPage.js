import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styled, { css } from "styled-components/native";
import { GRAY0, GRAY1, GRAY2, GRAY4, PRIMARY, WHITE } from "../../styles/color";
import { Bold17, SemiBold14 } from "../../styles/typography";
import { useRecoilState } from "recoil-react-native";
import { userInfoState } from "../../states/UserInfo";
import axios from "axios";

const NicknameSettingPage = ({ route, navigation }) => {
  const [nickname, setNickname] = useState("");

  const CertHeader = () => {
    return (
      <HeaderWrapper>
        <View>
          <TitleGrayTxt>이름 설정</TitleGrayTxt>
        </View>
        <View style={{ position: "absolute", right: 40 }}>
          <TitlePrimaryTxt>4/4</TitlePrimaryTxt>
        </View>
      </HeaderWrapper>
    );
  };

  const PurpleButton = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const onPressOutHandler = async () => {
      axios
        .patch(
          "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/nickname",
          {
            nickname: nickname,
          }
        )
        .then((res) => {
          let {
            uid,
            token,
            isPhoneAuthDone,
            isUnivAuthDone,
            isNicknameSettingDone,
            photoURL,
          } = userInfo;
          let data = {
            uid,
            token,
            isPhoneAuthDone: true,
            isUnivAuthDone: true,
            isNicknameSettingDone: true,
            photoURL,
          };
          setUserInfo(data);
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ButtonWrapper onPress={() => onPressOutHandler()}>
          <TitleWhiteTxt>가입 완료</TitleWhiteTxt>
        </ButtonWrapper>
      </View>
    );
  };

  return (
    <Wrapper>
      <CertHeader />
      <View style={{ marginBottom: 80 }}>
        <TextWrapper>
          <TitleGrayTxt>숨숨집 사람들은</TitleGrayTxt>
          <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <TitlePrimaryTxt>실명과 별명</TitlePrimaryTxt>
              <TitleGrayTxt>을 함께 사용합니다</TitleGrayTxt>
            </View>
            <TitleGrayTxt navigation={navigation}>
              사용하실 실명 앞 별명을 설정해주세요
            </TitleGrayTxt>
          </View>
        </TextWrapper>
        <View
          style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 10 }}
        >
          <InputWrapper>
            <TextInput
              value={nickname}
              onChangeText={(value) => setNickname(value)}
              placeholder={"최대 6글자"}
            />
          </InputWrapper>
        </View>
        <View style={{ alignItems: "center", paddingTop: 100 }}>
          <SubGrayText>역마낀 최지민</SubGrayText>
          <SubGrayText>부산청년 박지언</SubGrayText>
          <SubGrayText>영원한새내기 김채현</SubGrayText>
          <SubGrayText>전대마스터 홍성호</SubGrayText>
          <SubGrayText>.</SubGrayText>
          <SubGrayText>.</SubGrayText>
          <SubGrayText>.</SubGrayText>
        </View>
      </View>
      <PurpleButton />
    </Wrapper>
  );
};
const SubGrayText = styled.Text`
  ${SemiBold14};
  color: ${GRAY1};
  padding: 2px 0px 2px 0px;
`;

const ConfirmBtnWrapper = styled.View`
  background-color: ${PRIMARY};
  width: 100px;
  padding: 15px 20px 15px 20px;
  align-items: center;
`;

const InputWrapper = styled.View`
  width: 91%;
  border: 1px solid ${GRAY0};
  padding: 15px 20px 15px 20px;
  margin: 0px 20px 0px 20px;
`;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: space-between;
`;
const HeaderWrapper = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const UpperWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
const DownerWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 50px;
`;
const TextWrapper = styled.View`
  align-items: flex-start;
  margin: 0 0 0 30px;
`;
const TitleGrayTxt = styled.Text`
  ${Bold17};
  color: ${GRAY4};
`;
const TitleWhiteTxt = styled.Text`
  ${Bold17};
  color: ${WHITE};
`;
const TitlePrimaryTxt = styled.Text`
  ${Bold17};
  color: ${PRIMARY};
`;
const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${PRIMARY};
  padding: 15px 20px 15px 20px;
  margin: 0px 40px 0px 40px;
  align-items: center;
`;

export default NicknameSettingPage;

/*
const NicknameSettingPage = ({ route, navigation }) => {

  return (
    <View>
      <Text>
        닉네임 등록하기
      </Text>
      <Button
        title="회원가입 완료"
        onPress={()=>{
          navigation.dispatch(
            StackActions.popToTop()
          )
        }}
      />
    </View>
  );
}

export default NicknameSettingPage;
*/

import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import styled from "styled-components";
import { wishCoorState } from "../../states/User";

import { SemiBold14, Bold14, Regular14 } from "../../styles/typography";
import { PRIMARY, GRAY0 } from "../../styles/color";

import FullLogoImg from "../../assets/FullLogoImg.png";
import { useRecoilValue } from "recoil-react-native";
import { userInfoState } from "../../states/UserInfo";
import axios from "axios";
import getEnvVars from "../../settings/environment";

export default function MiniPostCard({ showComplete, navigation, id }) {
  const userInfo = useRecoilValue(userInfoState);
  const { apiUrl } = getEnvVars();
  const wishCoor = useRecoilValue(wishCoorState);
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .post(`${apiUrl}/api/posts/postid`, {
        xLocation: wishCoor.x,
        yLocation: wishCoor.y,
        post_uid: id,
      })
      .then((res) => {
        const { data } = res.data;
        setPost(data);
        address = data.location.split(" ");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {post && (
        <PostInfoWrapper
          onPress={() => {
            navigation.navigate("Details", {
              id: `${userInfo.uid}`,
            });
          }}
        >
          <View style={{ width: 222 }}>
            <PostTitle numberOfLines={1} ellipsizeMode="tail">
              {post.title}
            </PostTitle>
            <PostPrice>W{post.rentalFeeWeek}0,000/주</PostPrice>
            {showComplete && (
              <CompleteButton
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Text>거래완료</Text>
              </CompleteButton>
            )}
          </View>
          {showModal && (
            <ModalWrapper>
              <ModalContentWrapper>
                <ModalTxt>반드시 전대차 계약서를 작성해 안전하게</ModalTxt>
                <ModalTxt>
                  거래를 진행해주세요. 거래를 완료하시겠습니까?
                </ModalTxt>
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
                      .patch(`${apiUrl}/api/posts/dealt`, {
                        xLocation: wishCoor.x,
                        yLocation: wishCoor.y,
                        post_uid: route.params.id,
                      })
                      .then((res) => {
                        console.log(res);
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

          <PostImg source={FullLogoImg} />
        </PostInfoWrapper>
      )}
    </>
  );
}
const PostInfoWrapper = styled.TouchableOpacity`
  padding: 0 17px;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${GRAY0};
`;
const PostTitle = styled.Text`
  ${SemiBold14}
`;
const PostPrice = styled.Text`
  ${Bold14};
  color: ${PRIMARY};
  margin: 8px 0;
`;
const CompleteButton = styled.TouchableOpacity`
  width: 110px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${GRAY0};
`;
const PostImg = styled.Image`
  width: 83px;
  height: 86px;
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

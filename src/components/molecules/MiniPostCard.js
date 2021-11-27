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

export default function MiniPostCard({
  showComplete,
  navigation,
  id,
  setShowModal,
}) {
  const userInfo = useRecoilValue(userInfoState);
  const { apiUrl } = getEnvVars();
  const wishCoor = useRecoilValue(wishCoorState);
  const [post, setPost] = useState();

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
    <View>
      {post && (
        <PostInfoWrapper
          onPress={() => {
            navigation.navigate("Details", {
              id: `${userInfo.uid}`,
            });
          }}
        >
          <View style={{ width: 222 }}>
            <PostTitle isDealt={post.isDealt} numberOfLines={1} ellipsizeMode="tail">
              {post.title}
            </PostTitle>
            <PostPrice isDealt={post.isDealt}>W{post.rentalFeeWeek}0,000/주</PostPrice>
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

          <PostImg
            source={{
              uri: post.pictures[0],
            }}
          />
        </PostInfoWrapper>
      )}
    </View>
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
  color: ${(props) => props.isDealt ? "#b7b7b7" : "black"}
`;
const PostPrice = styled.Text`
  ${Bold14};
  color: ${(props) => props.isDealt ? "#b7b7b7" : PRIMARY}
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
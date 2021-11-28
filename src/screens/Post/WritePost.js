import React, { useEffect, useState } from "react";
import axios from "axios";
import getEnvVars from "../../settings/environment";

import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  LogBox,
} from "react-native";
import styled from "styled-components";
import { ImageBrowser } from "expo-image-picker-multiple";
import { postAddrState, postCoorState, postImgState } from "../../states/Post";
import { useRecoilValue, useSetRecoilState } from "recoil-react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import HeaderTemplate from "../../components/template/HeaderTemplate";
import {
  buildingType,
  userGenderType,
  userSmokingType,
  roomOptionType,
  roomFeatureType,
  floorsType,
  roomType,
} from "../Home/ItemOptionData";

import {
  Bold14,
  SemiBold17,
  SemiBold14,
  Medium12,
  Regular12,
} from "../../styles/typography";
import { PRIMARY, GRAY0, GRAY1, GRAY4 } from "../../styles/color";

import CamIcon from "../../assets/camera.png";
import SelectButton from "../../components/atoms/SelectButton";
import TagSelectButton from "../../components/atoms/TagSelectButton";

import * as firebase from "firebase/app";



export default function WritePostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [location, setLocation] = useState("동 또는 도로명까지 입력해주세요");
  const [coor, setCoor] = useState();
  const [pictures, setPictures] = useState();
  const [rentalFeeMonth, setRentalFeeMonth] = useState();
  const [rentalFeeWeek, setRentalFeeWeek] = useState();
  const [myBuildingType, setMyBuildingType] = useState();
  const [myFloorsType, setMyFloorsType] = useState();
  const [myRoomType, setMyRoomType] = useState();
  const [myRoomFeature, setMyRoomFeature] = useState();
  const [myRoomOption, setMyRoomOption] = useState();
  const [gender, setGender] = useState();
  const [smoking, setSmoking] = useState();
  const [date, setDate] = useState({
    startDate: +new Date(),
    finishDate: +new Date(),
  });
  // const [imgArr, setImgArr] = useState([]);
  const { apiUrl, apiKey, projectId, storageBucket, messagingSenderId } = getEnvVars();
  const [showDatePicker, setShowDatePicker] = useState({
    start: false,
    finish: false,
  });
  const [isAllFilled, SetIsAllFilled] = useState(true);
  const sampleArr = ["hi", "my", "name"];
  const [imgUri, setImgUri] = useState(null);

  // console.disableYellowBox = true;
  LogBox.ignoreAllLogs(true);

  // 업로드
  const firebaseConfig = {
    apiKey,
    projectId,
    storageBucket,
    messagingSenderId,
  };

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
  }, [])

  const uploadOnFirebase = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase.storage().ref().child("images/" + imageName)
    console.log(ref);
    return ref.put(blob);
  }

  const onUploadHandler = (uri) => {
    uploadOnFirebase(uri, uri)
      .then((res) => {
        setImgUri(res);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderTemplate title="매물 작성" navigation={navigation} left={true} />

      {/* {imgAddr !== "" && <Image source={{ uri: imgAddr }} />} */}
      {/* {imgAddr ? <Text>{imgAddr}</Text> : null} */}
      <InputWrapper>
        <SmallSectionTitle>사진 업로드</SmallSectionTitle>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <UploadImgWrapper
            onPress={() => {
              navigation.navigate("UploadImg", { setPictures: setPictures });
            }}
          >
            <Image style={{ width: 26, height: 26 }} source={CamIcon} />
          </UploadImgWrapper>
          {pictures && (
            <PreviewImg
              source={{
                uri: "https://images.pexels.com/photos/6636309/pexels-photo-6636309.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
              }}
            />
          )}
        </View>

        <View>
          <SmallSectionTitle>제목</SmallSectionTitle>
          <StyledTextinput
            placeholder="글 제목을 입력해주세요.(최대 20자)"
            placeholderTextColor={GRAY1}
            onChangeText={setTitle}
            maxLength={20}
          />
          <SmallSectionTitle>설명</SmallSectionTitle>
          <StyledTextinput
            placeholder={"매물에 대해서 상세하게 설명해주세요."}
            onChangeText={setDescription}
            placeholderTextColor={GRAY1}
            style={{
              height: 137,
            }}
          />
        </View>
        <View>
          <SectionTitle>거래 정보</SectionTitle>
          <SmallSectionTitle>가격</SmallSectionTitle>
          <FlexRowCenterWrppaer>
            <StyledTextinput
              keyboardType="numeric"
              placeholder={"주 단위 금액을 입력해주세요."}
              placeholderTextColor={GRAY1}
              onChangeText={setRentalFeeWeek}
            />
            <PriceUnitTxt>/주</PriceUnitTxt>
          </FlexRowCenterWrppaer>
          <FlexRowCenterWrppaer>
            <StyledTextinput
              keyboardType="numeric"
              placeholder={"월 단위 금액을 입력해주세요."}
              placeholderTextColor={GRAY1}
              onChangeText={setRentalFeeMonth}
            />
            <PriceUnitTxt>/월</PriceUnitTxt>
          </FlexRowCenterWrppaer>
          <SmallSectionTitle>전대기간*</SmallSectionTitle>
          <FlexRowCenterWrppaer
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <BorderButton
              onPress={() => setShowDatePicker({ start: true, finish: false })}
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
            >
              <BorderButtonTxt>
                {new Date(date.startDate).getMonth() + 1}월{" "}
                {new Date(date.startDate).getDate()}일
              </BorderButtonTxt>
            </BorderButton>

            <Text>~</Text>
            <BorderButton
              onPress={() => {
                setShowDatePicker({ start: false, finish: true });
              }}
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
            >
              <BorderButtonTxt>
                {new Date(date.finishDate).getMonth() + 1}월{" "}
                {new Date(date.finishDate).getDate()}일
              </BorderButtonTxt>
            </BorderButton>
            <DateTimePickerModal
              isVisible={showDatePicker.start}
              mode="date"
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
              onConfirm={(value) => {
                setDate({ startDate: value, finishDate: date.finishDate });
                setShowDatePicker({ start: false, finish: false });
              }}
            />
            <DateTimePickerModal
              isVisible={showDatePicker.finish}
              mode="date"
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
              onConfirm={(value) => {
                setDate({ startDate: date.startDate, finishDate: value });
                setShowDatePicker({ start: false, finish: false });
              }}
            />
          </FlexRowCenterWrppaer>
        </View>
        <View>
          <SectionTitle>방 정보</SectionTitle>
          <SmallSectionTitle>주소</SmallSectionTitle>
          <BorderButton
            style={{ width: "100%", alignItems: "flex-start", paddingLeft: 16 }}
            onPress={() => {
              navigation.navigate("LocationSearch", {
                prev: "WritePost",
                setCoor: setCoor,
                setLocation: setLocation,
              });
            }}
          >
            <BorderButtonTxt>{location}</BorderButtonTxt>
          </BorderButton>
          <SmallSectionTitle>매물 기본정보</SmallSectionTitle>

          <SmallSectionWrapper>
            {buildingType.map((type, i) => {
              if (i !== 0)
                return (
                  <SelectButton
                    onPress={() => {
                      setMyBuildingType(type);
                    }}
                    txt={type}
                  />
                );
            })}
          </SmallSectionWrapper>
          <SmallSectionTitle>층수 옵션</SmallSectionTitle>
          <SmallSectionWrapper>
            {floorsType.map((type, i) => {
              if (i !== 0)
                return (
                  <SelectButton
                    onPress={() => {
                      setMyFloorsType(type);
                    }}
                    txt={type}
                  />
                );
            })}
          </SmallSectionWrapper>
          <SmallSectionTitle>방 종류</SmallSectionTitle>
          <SmallSectionWrapper>
            {roomType.map((type, i) => {
              if (i !== 0)
                return (
                  <SelectButton
                    onPress={() => {
                      setMyRoomType(type);
                    }}
                    txt={type}
                  />
                );
            })}
          </SmallSectionWrapper>
          <SmallSectionTitle>방 옵션</SmallSectionTitle>
          <SmallSectionWrapper>
            {roomOptionType.map((type, i) => (
              <SelectButton
                onPress={() => {
                  setMyRoomOption(i);
                }}
                txt={type}
                flag={i}
              />
            ))}
          </SmallSectionWrapper>

          <SmallSectionTitle>특징</SmallSectionTitle>
          <SmallSectionWrapper>
            {roomFeatureType.map((type, i) => (
              <TagSelectButton
                onPress={() => {
                  setMyRoomFeature(i);
                }}
                txt={`#${type}`}
              />
            ))}
          </SmallSectionWrapper>
          <SmallSectionTitle>희망하는 전차인 유형</SmallSectionTitle>
          <SmallSectionWrapper>
            {userGenderType.map((type, i) => (
              <SelectButton
                onPress={() => {
                  setGender(i);
                }}
                txt={type}
              />
            ))}
            {userSmokingType.map((type, i) => (
              <SelectButton
                onPress={() => {
                  setSmoking(i);
                }}
                txt={type}
              />
            ))}
          </SmallSectionWrapper>
        </View>
      </InputWrapper>
      <FixedFooter
        onPress={() => {
          onUploadHandler(pictures[0])
          let result = new Object();
          result.title = title;
          result.description = description;
          result.location = location;
          result.xLocation = coor.x;
          result.yLocation = coor.y;
          result.rentalFeeMonth = rentalFeeMonth;
          result.rentalFeeWeek = rentalFeeWeek;
          result.buildingType = myBuildingType;
          result.floors = myFloorsType;
          result.roomType = myRoomType;
          result.residentStartDate = new Date(date.startDate).getTime();
          result.residentFinishDate = new Date(date.finishDate).getTime();
          result.gender = gender;
          result.smoking = smoking;
          result.pictures = [
            imgUri,
          ];
          result.features = [myRoomFeature];
          result.options = [myRoomOption];

          console.log("result:", result);
          axios
            .post(`${apiUrl}/api/posts`, result)
            .then((res) => {
              //console.log(res);
              navigation.navigate("Home");
            })
            .catch((err) => {
              console.log(err);
            });

          // result.map((el, i) => {
          //   if (!el) {
          //     alert("빈칸을 채워주세요");
          //     SetIsAllFilled(false);
          //   }
          // });
          // if (isAllFilled) {
          //   axios
          //     .post(`${apiUrl}/api/posts`, result)
          //     .then((res) => {
          //       console.log(res);
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //     });
          // } else alert("빈 칸을 채워주세요");
          */
        }
      }>
        <FooterTxt>작성완료</FooterTxt>
      </FixedFooter>
    </View>
  );
}
const UploadImgWrapper = styled.TouchableOpacity`
  background-color: white;
  height: 77px;
  width: 92px;
  border: 1px solid ${GRAY0};
  justify-content: center;
  align-items: center;
`;
const PreviewImg = styled.Image`
  height: 77px;
  width: 92px;
  margin: 0 8px;
`;
const InputWrapper = styled.ScrollView`
  padding: 0 16px;
  margin-bottom: 16px;
`;
const FlexRowCenterWrppaer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const StyledTextinput = styled.TextInput`
  height: 44px;
  border: 1px solid ${GRAY0};
  padding: 0 16px;
  flex: 1;
  margin: 5px 0;
`;
const BorderButton = styled.TouchableOpacity`
  height: 44px;
  border: 1px solid ${GRAY0};
  justify-content: center;
  width: 133px;
  align-items: center;
`;
const BorderButtonTxt = styled.Text`
  ${Medium12};
  color: ${GRAY1};
`;

const SectionTitle = styled.Text`
  ${SemiBold17};
  margin-top: 65px;
`;
const SmallSectionTitle = styled.Text`
  ${SemiBold14};
  margin-top: 32px;
  margin-bottom: 13px;
`;
const SmallSectionWrapper = styled.View`
  flex: 3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PriceUnitTxt = styled.Text`
  ${Bold14};
  color: ${PRIMARY};
  margin-left: 10px;
`;
const FixedFooter = styled.TouchableOpacity`
  background-color: ${PRIMARY};
  height: 48px;
  margin: 0 16px 22px 16px;
  justify-content: center;
  align-items: center;
  color: white;
`;
const FooterTxt = styled.Text`
  color: white;
  ${SemiBold14}
`;
const SelectWrapper = styled.TouchableOpacity`
  height: 44px;
`;

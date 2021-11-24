import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { ImageBrowser } from "expo-image-picker-multiple";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useRecoilState } from "recoil-react-native";
import {
  postTitleState,
  postAddrState,
  dateState,
  postImgState,
} from "../../states/Post";

export default function WritePostScreen({ navigation }) {
  const [title, setTitle] = useRecoilState(postTitleState);
  const [addr, setAddr] = useRecoilState(postAddrState);
  const [date, setDate] = useRecoilState(dateState);
  const [imgAddr, setImgAddr] = useRecoilState(postImgState);
  // const [imgArr, setImgArr] = useState([]);

  return (
    <View>
      <UploadImgWrapper
        onPress={() => {
          navigation.navigate("UploadImg");
        }}
      >
        <Text>사진 여러장 업로드 가능</Text>
      </UploadImgWrapper>

      <TextInput placeholder={"제목을 입력하세요"} onChangeText={setTitle} />
      <View>
        {imgAddr !== "" && <Image source={{ uri: imgAddr }} />}
        {imgAddr ? <Text>{imgAddr}</Text> : null}
        <Text>기본 정보</Text>
        <View>
          <Text>주소*</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LocationSearch", {
                prev: "Post",
              });
            }}
          >
            <Text>{addr}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>가격*</Text>
          <View>
            <TextInput keyboardType="numeric" />
            <Text>만원/주</Text>
          </View>
          <View>
            <TextInput keyboardType="numeric" />
            <Text>만원/월</Text>
          </View>
        </View>
        <View>
          <Text>관리비 포함 여부*</Text>
          <Button title="포함" />
          <Button title="미포함" />
        </View>
        <View>
          <Text>전대기간*</Text>
          <DateTimePicker
            value={date.startDate}
            is24Hour={true}
            display="default"
            onChange={(e, selectedDate) => {
              const currentDate = selectedDate || date;
              // setShow(Platform.OS === "ios");
              setDate({
                startDate: currentDate,
                finishDate: date.finishDate,
              });
            }}
          />
          <Text>~</Text>
          <DateTimePicker
            value={date.finishDate}
            is24Hour={true}
            display="default"
            onChange={(e, selectedDate) => {
              const currentDate = selectedDate || date;
              // setShow(Platform.OS === "ios");
              setDate({ startDate: date.startDate, finishDate: currentDate });
            }}
          />
        </View>
      </View>
    </View>
  );
}
const UploadImgWrapper = styled.TouchableOpacity`
  background-color: gray;
  height: 200px;
`;

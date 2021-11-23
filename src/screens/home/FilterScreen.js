import React, { useState } from "react";
import styled from "styled-components";
import {
  buildingType,
  floorsType,
  roomType,
  roomFeatureType,
} from "./optionData";
import { useRecoilState } from "recoil-react-native";
// import { dateState } from "../../states/Filter";

// styles
import { SemiBold14 } from "../../styles/typography";
import { GRAY0, PRIMARY } from "../../styles/color";

// components
import {
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Progress, Slider } from "@ant-design/react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FilterButton from "../../components/atoms/FilterButton";

export default function FilterScreen({ navigation }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState({
    startDate: new Date(today),
    finishDate: new Date(today),
  });
  return (
    <View style={{ flex: 1 }}>
      <Wrapper>
        <SectionWrapper>
          <Title>기간</Title>
          <SectionContentWrapper>
            <StyledDatePicker
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
            <StyledDatePicker
              value={date.finishDate}
              is24Hour={true}
              display="default"
              onChange={(e, selectedDate) => {
                const currentDate = selectedDate || date;
                // setShow(Platform.OS === "ios");
                setDate({
                  startDate: date.startDate,
                  finishDate: currentDate,
                });
              }}
            />
          </SectionContentWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>가격</Title>
          <Slider onDefaultVallue={30} max={70} />
        </SectionWrapper>
        <SectionWrapper>
          <Title>건물 유형</Title>
          <ButtonWrapper>
            {buildingType?.map((type) => (
              <FilterButton key={type} txt={type} />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>층수 옵션</Title>
          <ButtonWrapper>
            {floorsType?.map((type) => (
              <FilterButton key={type} txt={type} />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>방 종류</Title>
          <ButtonWrapper>
            {roomType?.map((type) => (
              <FilterButton key={type} txt={type} />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>방 특징</Title>
          <ButtonWrapper>
            {roomFeatureType?.map((type) => (
              <FilterButton key={type} txt={type} />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
      </Wrapper>
      <FixedFooter
        onPress={() => {
          navigation.navigate("Result");
        }}
      >
        <FooterTxt>설정완료</FooterTxt>
      </FixedFooter>
    </View>
  );
}

const Wrapper = styled.ScrollView`
  padding: 30px 21px 0 21px;
  flex: 1;
  background-color: white;
`;
const SectionWrapper = styled.View`
  margin-bottom: 37px;
`;
const SectionContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const StyledDatePicker = styled(DateTimePicker)`
  background-color: white;
  border-radius: 0;
  border-width: 1px;
  border-color: ${GRAY0};
  width: 125px;
  color: black;
  padding: 14px;
`;
const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Title = styled.Text`
  ${SemiBold14};
  margin-bottom: 13px;
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

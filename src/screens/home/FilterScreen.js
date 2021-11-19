import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import { Progress, Slider } from "@ant-design/react-native";
import FilterButton from "../../components/atoms/FilterButton";
export const buildingTypeData = [
  "전체",
  "빌라",
  "주택",
  "아파트",
  "오피스텔",
  "기타",
];

export default function FilterScreen() {
  return (
    <View>
      <View>
        <Text>기간</Text>
      </View>
      <View>
        <Text>가격</Text>
        <Slider onDefaultVallue={30} max={70} />
      </View>
      <View>
        <Text>건물 유형</Text>
        {buildingTypeData?.map((type) => (
          <FilterButton key={type} txt={type} />
        ))}
      </View>
      <View>
        <Text>층수 옵션</Text>
      </View>
      <View>
        <Text>방종류</Text>
      </View>
      <Button
        title="설정완료"
        onPress={() => {
          console.log("필터 설정 완료");
        }}
      />
    </View>
  );
}

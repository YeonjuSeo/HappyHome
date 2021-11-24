import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import BackIcon from "../../assets/icon_back.png";

export default function BackButton({ navigation: { goBack } }) {
  return (
    <TouchableOpacity
      onPress={() => {
        goBack();
      }}
    >
      <Image style={{ width: 28, height: 28 }} source={BackIcon} />
    </TouchableOpacity>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";
import { Medium14, Regular12 } from "../../styles/typography";
import { PRIMARY } from "../../styles/color";

import FullLogoImg from "../../assets/FullLogoImg.png";

export function BubbleYou({ txt, now }) {
  return (
    <YouWrapper>
      <YouBubbleWrapper>
        <YouBubbleTxt>{txt}</YouBubbleTxt>
      </YouBubbleWrapper>
      <Moment now={now} from={"YOU"} />
    </YouWrapper>
  );
}

export function BubbleMe({ txt, now }) {
  return (
    <MeWrapper>
      <MeBubbleWrapper>
        <MeBubbleTxt>{txt}</MeBubbleTxt>
      </MeBubbleWrapper>
      <Moment now={now} from={"ME"} />
    </MeWrapper>
  );
}

export function ImgBubble({ from, now }) {
  return (
    <ImgWrapper from={from}>
      <ImgBubbleWrapper>
        <Image source={FullLogoImg} />
      </ImgBubbleWrapper>
      <Moment now={now} from={from} />
    </ImgWrapper>
  );
}

function Moment({ now, from }) {
  const date = new Date();
  const [daytime, setDaytime] = useState(true);
  if (now) {
    if (date.getHours >= 13) setDaytime(false);
  }

  return (
    <MomentTxt from={from}>
      {!now
        ? "오전 10:00"
        : daytime
        ? `오전 ${date.getHours()}:${date.getMinutes(0)}`
        : `오후 ${date.getHours()}:${date.getMinutes()}`}
    </MomentTxt>
  );
}

const YouWrapper = styled.View`
  margin-left: 8px;
`;
const YouBubbleWrapper = styled.View`
  background-color: #e7e7e7;
  padding: 9px 16px;
  max-width: 238px;
  border-radius: 3px;
`;
const YouBubbleTxt = styled.Text`
  ${Medium14};
  color: black;
`;
const MeWrapper = styled.View`
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 8px;
`;
const MeBubbleWrapper = styled.View`
  background-color: ${PRIMARY};
  padding: 9px 16px;
  max-width: 238px;
  border-radius: 3px;
`;
const MeBubbleTxt = styled.Text`
  ${Medium14};
  color: white;
`;

const ImgWrapper = styled.View`
  align-self: ${(props) => (props.from == "ME" ? "flex-end" : "auto")};
  margin: ${(props) => (props.from == "ME" ? "0 8px 0 0" : "0 0 0 8px")};
`;

const ImgBubbleWrapper = styled.View`
  width: 134px;
  height: 153px;
  overflow: hidden;
  border-radius: 5px;
`;

const MomentTxt = styled.Text`
  ${Regular12}
  margin:5px 0 10px 0;
  align-self: ${(props) => (props.from == "ME" ? "flex-end" : "auto")};
`;

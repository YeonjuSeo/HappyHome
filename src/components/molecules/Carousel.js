import React, { useState } from "react";
import styled from "styled-components";
import { Animated, Image, Dimensions, ScrollView } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const images = [
  "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
  "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",
];

export default function Carousel({ data = images, height, isIdxVisible }) {
  const [imgIdx, setImgIdx] = useState(1);
  const numItems = images.length;
  const animVal = new Animated.Value(0);

  let imageArray = [];
  data.forEach((image, i) => {
    const thisImage = (
      <Image
        key={`image${i}`}
        source={{ uri: image }}
        style={{ width: deviceWidth }}
      />
    );
    imageArray.push(thisImage);
  });

  return (
    <Wrapper height={height}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        onScroll={(e) => {
          const scrollX = e.nativeEvent.contentOffset.x;
          Animated.event([{ nativeEvent: { contentOffset: { x: animVal } } }], {
            useNativeDriver: false,
          });
          if (scrollX % deviceWidth == 0) {
            setImgIdx(scrollX / deviceWidth + 1);
          }
        }}
      >
        {imageArray}
      </ScrollView>
      {isIdxVisible && (
        <IdxWrapper>
          <IdxTxt>
            {imgIdx}/{numItems}
          </IdxTxt>
        </IdxWrapper>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  height: ${(props) => props.height}px;
`;
const IdxWrapper = styled.View`
  width: 44px;
  height: 24px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
const IdxTxt = styled.Text`
  color: white;
`;

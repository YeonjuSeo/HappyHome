import { atom } from "recoil-react-native";

export const buildingTypeData = [
  "전체",
  "빌라",
  "주택",
  "아파트",
  "오피스텔",
  "기타",
];
export const floorsType = ["전체", "지상층", "반지하/옥탑"];
export const roomType = ["전체", "오픈형", "복층", "분리형"];

export const startDateState = atom({
  key: "startDateState",
  default: "오늘날짜",
});
export const finishDateState = atom({
  key: "finishDateState",
  default: "오늘날짜",
});
export const priceState = atom({
  key: "priceState",
  default: { min: 0, max: 500000 },
});
export const buildingTypeState = atom({
  key: "buildingTypeState",
  default: "",
});
export const roomTypeState = atom({
  key: "roomTypeState",
  default: "",
});
export const floorsState = atom({
  key: "floorState",
  default: "",
});
export const genderState = atom({
  key: "genderState",
  default: "",
});
export const smokingState = atom({
  key: "smokingState",
  default: "",
});

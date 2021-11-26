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
const today = new Date().toISOString().slice(0, 10);

export const postTitleState = atom({
  key: "postTitleState",
  default: "제목",
});
export const postAddrState = atom({
  key: "postAddrState",
  default: "ff",
});
export const postImgState = atom({
  key: "postImgState",
  default: "",
});
export const dateState = atom({
  key: "dateState",
  default: { startDate: new Date(today), finishDate: new Date(today) },
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

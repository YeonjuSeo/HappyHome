import { atom } from "recoil-react-native";

const today = new Date().toISOString().slice(0, 10);

export const dateState = atom({
  key: "dateState",
  default: "",
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

import { atom } from "recoil-react-native";
export const wishAddrState = atom({
  key: "wishAddrState",
  default: "",
});

export const wishCoorState = atom({
  key: "wishCoorState",
  default: { x: 0, y: 0 },
});

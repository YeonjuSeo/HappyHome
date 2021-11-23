import { atom } from "recoil-react-native";

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});

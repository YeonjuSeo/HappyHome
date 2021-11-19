import React, { useEffect } from "react";
import Postcode from "@actbase/react-daum-postcode";
import { wishAddrState } from "../../states/User";
import { postAddrState } from "../../states/Post";
import { useSetRecoilState } from "recoil-react-native";

export function LocationSearchScreen({ route, navigation }) {
  const setWishAddr = useSetRecoilState(wishAddrState);
  const setPostAddr = useSetRecoilState(postAddrState);

  return (
    <Postcode
      style={{ width: 320, height: 320 }}
      jsOptions={{ animation: true }}
      onSelected={(data) => {
        if (route.params.prev == "Home")
          setWishAddr(JSON.stringify(data.bname));
        else if (route.params.prev == "Post")
          setPostAddr(JSON.stringify(data.roadAddress));
        navigation.navigate(route.params.prev);
      }}
    />
  );
}

export default LocationSearchScreen;

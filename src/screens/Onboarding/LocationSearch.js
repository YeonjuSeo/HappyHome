import React from "react";
import Postcode from "@actbase/react-daum-postcode";

export function LocationSearchScreen({ route, navigation }) {
  return (
    <Postcode
      style={{ width: 320, height: 320 }}
      jsOptions={{ animation: true }}
      onSelected={(data) =>
        navigation.navigate({
          name: "WishLocation",
          params: { wishAddr: data },
          merge: true,
        })
      }
    />
  );
}

export default LocationSearchScreen;

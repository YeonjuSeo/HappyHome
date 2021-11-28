import React, { useMemo } from "react";
import { StatusBar, View, StyleSheet, SafeAreaView } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MediaType } from "expo-media-library";
import { GRAY2, GRAY4 } from "../../styles/color";
const ForceInset = {
  top: "never",
  bottom: "never",
};

// IOS users , make sure u can use the images uri to upload , if your getting invalid file path or u cant work with asset-library://
// Use = > getImageMetaData: true which will be little slower but give u also the absolute path of the Asset. just console loge the result to see the localUri

export default function UploadImg({ navigation, route }) {
  // const [imgUri, setImgUri] = useRecoilState(postImgState);
  const onSuccess = (data) => {
    // console.log(JSON.stringify(data));
    let tempImgArr = [];
    data.map(async (item, i) => {
      //   let uri = item.uri.replace("ph://", "");
      //   const hash = uri.split("/")[0];
      //   console.log(`assets-library://asset/asset.jpg?id=${hash}&ext=jpg`);
      //   setImgUri(`assets-library://asset/asset.jpg?id=${hash}&ext=jpg`);
      let uri = item.uri.slice(5);
      let returnedUri = await MediaLibrary.getAssetInfoAsync(uri);
      tempImgArr.push(returnedUri.localUri);
      console.log(tempImgArr);
      // console.log(returnedUri.localUri);
      // returnedUri = returnedUri.localUri + ".jpg";
      //   console.log(returnedUri);
    });
    // setImgUri(tempImgArr);
    route.params.setPictures(tempImgArr);

    //console.log(JSON.stringify(`file://${data[0].uri}`));
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was an error while loading images.",
        hasErrorWithResizing: "There was an error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 3,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: `${GRAY4}`,
    fontWeight: "400",
    fontSize: 17,
    borderWidth: 1,
    borderColor: `${GRAY2}`,
    width: 97,
    paddingTop: 7,
    paddingBottom: 7,
    textAlign: "center",
  };

  const _buttonStyle = {
    backgroundColor: "white",
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "finish",
        back: "back",
        selected: "Selected",
      },
      midTextColor: "black",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        navigation.goBack();
      },
      onSuccess: (e) => {
        onSuccess(e);
        // navigation.dispatch(
        //   StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: "WritePost" })],
        //   })
        // );
        navigation.navigate("WritePost");
      },
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: `rgba(0,0,0,0.35)`,
        size: 26,
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
            // Resize={widgetResize} know how to use first , perform slower results.
          />
          <View></View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import getEnvVars from "../../settings/environment";
import { isLoggedInState } from "../../states/IsLoggedIn";
import { userInfoState } from "../../states/UserInfo";
import { useRecoilState } from "recoil-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const kakaoLoginScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { apiUrl, kakaoApiKey } = getEnvVars();
  const kakaoBaseURL = "https://kauth.kakao.com/oauth";

  const requestAccessCode = (data) => {
    const exp = "code=";
    const condition = data.indexOf(exp);

    if (condition != -1) {
      const request_code = data.substring(condition + exp.length);
      console.log("access code : " + request_code);
      requestToken(request_code);
    }
  };

  const requestToken = async (request_code) => {
    let returnValue = "none";
    const request_token_url = `${kakaoBaseURL}/token`;

    axios({
      method: "post",
      url: request_token_url,
      params: {
        grant_type: "authorization_code",
        client_id: `${kakaoApiKey}`, //rest api key
        redirect_uri: `${apiUrl}/api/users/auth/redirect`, //redirect uri
        code: request_code,
      },
    })
      .then((response) => {
        kakaoToken = response.data.access_token;
        console.log("!!access token : " + kakaoToken);
        //setAuth(returnValue)
        //AsyncStorage.setItem("token", returnValue)
        //  .then(() => {
        //    console.log('Go back')
        //    navigation.goBack();
        //  })
        axios
          .get(
            "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/signin",
            {
              headers: {
                Authorization: kakaoToken,
              },
            }
          )
          .then((res) => {
            const { token, user } = res.data.data;
            let data = {
              uid: user.uid,
              token,
              isPhoneAuthDone: user.isPhoneAuthDone,
              isUnivAuthDone: user.isUnivAuthDone,
              isNicknameSettingDone: user.isNicknameSettingDone,
              photoURL: user.photoURL,
            };
            setUserInfo(data);
            setIsLoggedIn(true);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            AsyncStorage.setItem("auth", JSON.stringify(data)).then(() => {
              navigation.goBack();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: `${kakaoBaseURL}/authorize?client_id=${kakaoApiKey}&redirect_uri=${apiUrl}/api/users/auth/redirect&response_type=code`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          requestAccessCode(event.nativeEvent["url"]);
        }}
        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
};

export default kakaoLoginScreen;

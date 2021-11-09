import React from 'react';
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import getEnvVars from '../../settings/environment';

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const kakaoLoginScreen = () => {
  const { apiUrl, kakaoApiKey } = getEnvVars();
  const kakaoBaseURL = "https://kauth.kakao.com/oauth";

  const requestAccessCode = (data) => {
    const exp = "code=";
    const condition = data.indexOf(exp);

    if (condition != -1) {
        const request_code = data.substring(condition + exp.length);
        //console.log("access code : " + request_code);
        requestToken(request_code);
    }
  }

  const requestToken = async (request_code) => {
    let returnValue = "none";
    const request_token_url = `${kakaoBaseURL}/token`;

    axios({
        method: "post",
        url: request_token_url,
        params: {
            grant_type: 'authorization_code',
            client_id: `${kakaoApiKey}`,  //rest api key
            redirect_uri: `${apiUrl}/user/oauth`,    //redirect uri
            code: request_code,
        },
    }).then((response) => {
        returnValue = response.data.access_token;
        //console.log("access token : " + returnValue);
    }).catch((error) => {
        console.log('error', error);
    });
  }

  return (
    <View style={{flex:1}}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{ uri: `${kakaoBaseURL}/authorize?client_id=${kakaoApiKey}&redirect_uri=${apiUrl}/user/oauth&response_type=code` }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => { requestAccessCode(event.nativeEvent["url"]); }}
        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  )
}

export default kakaoLoginScreen;
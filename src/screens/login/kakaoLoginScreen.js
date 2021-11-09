import React from 'react';
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const kakaoLoginScreen = () => {

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
    const request_token_url = "https://kauth.kakao.com/oauth/token";

    axios({
        method: "post",
        url: request_token_url,
        params: {
            grant_type: 'authorization_code',
            client_id: '발급받은_rest_api_key',  //rest api key
            redirect_uri: 'https://us-central1-sumsum-af3c7.cloudfunctions.net/user/oauth',    //redirect uri
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
        source={{ uri: 'https://kauth.kakao.com/oauth/authorize?client_id=1908d7cac3640106048d098e6bf64be2&redirect_uri=https://us-central1-sumsum-af3c7.cloudfunctions.net/user/oauth&response_type=code' }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => { requestAccessCode(event.nativeEvent["url"]); }}
        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  )
}

export default kakaoLoginScreen;
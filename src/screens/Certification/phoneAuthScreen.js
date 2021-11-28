import React from "react";
import IMP from "iamport-react-native";
import { SafeAreaView } from "react-native";
import { useRecoilState } from "recoil-react-native";
import { userInfoState } from "../../states/UserInfo";
import axios from "axios";
// import Loading from "./Loading";

export function phoneAuthScreen({ navigation }) {

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const onPressOutHandler = async () => {
    axios.
      patch(
        "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/auth/phoneauth",
      )
      .then((res) => {
        let {uid, token, isPhoneAuthDone, isUnivAuthDone, isNicknameSettingDone, photoURL} = userInfo;
        let data = {
          uid,
          token,
          isPhoneAuthDone: true,
          isUnivAuthDone: false,
          isNicknameSettingDone: false,
          photoURL
        }
        setUserInfo(data);
        navigation.navigate("UnivAuthLandingPage");
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function callback(response) {
    navigation.navigate("Home"); //navigation.replace("CertificationResult",response);
  }

  /* [필수입력] 본인인증에 필요한 데이터. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: "아임포트",
    name: "김승우",
    phone: "01059555425",
    min_age: "11",
  };
  const userCode = getUserCode("danal", "", "certification");

  return (
    <SafeAreaView style={{flex:1}}>
      <IMP.Certification
        userCode={userCode} // 가맹점 식별코드
        tierCode={""} // 티어 코드: agency 기능 사용자에 한해 필요하므로 필요 없음
        // loading={<Loading />} // 로딩 컴포넌트
        data={data} // 본인인증 데이터
        callback={() => onPressOutHandler()} // 본인인증 종료 후 콜백
      />
    </SafeAreaView>
  );
}

export default phoneAuthScreen;

function getUserCode(pg, tierCode, type = "payment") {
  if (tierCode) {
    return "imp91623210";
  }
  if (type === "certification") {
    return "imp10391932";
  }

  switch (pg) {
    case "kakao":
      return "imp10391932";
    case "paypal":
      return "imp09350031";
    case "mobilians":
      return "imp60029475";
    case "naverco":
    case "naverpay":
      return "imp41073887";
    case "smilepay":
      return "imp49241793";
    case "chai":
      return "imp37739582";
    case "alipay":
      return "imp87936124";
    case "payple":
      return "imp42284830";
    default:
      return "imp19424728";
  }
}

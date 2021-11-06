import React from "react";
/* 아임포트 본인인증 모듈을 불러옵니다. */
import IMP from "iamport-react-native";

/* 로딩 컴포넌트를 불러옵니다. */
// import Loading from "./Loading";

export function CertificationScreen({ navigation }) {
  /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    navigation.navigate("Home"); //navigation.replace("CertificationResult",response);
  }

  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: "아임포트",
    carrier: "SKT",
    name: "서연주",
    phone: "01027646794",
    min_age: "11",
  };
  const userCode = getUserCode("danal", "", "certification");

  return (
    <IMP.Certification
      userCode={userCode} // 가맹점 식별코드
      tierCode={""} // 티어 코드: agency 기능 사용자에 한함
      // loading={<Loading />} // 로딩 컴포넌트
      data={data} // 본인인증 데이터
      callback={callback} // 본인인증 종료 후 콜백
    />
  );
}

export default CertificationScreen;

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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Duplicate atom key 에러 메시지 없애기 위해 환경변수 설정
//원인1 : next.js 개발 중 파일변경되면 해당 파일을 다시 build함 build되면서 atom이 재선언됨 그런데 atom key는 중복되지 않는 고유값을 가져야 하는데 재선언되면서 에러가 발생.
//원인2 : 파생된 selector상태를 atom상태와 같이 두지않고, 다른 함수안에 넣었더니 키 중복이 떴음.
// RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

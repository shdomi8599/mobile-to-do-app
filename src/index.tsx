import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import { checkDayBeforeYesterday } from "./function/localStorage/checkDayBeforeYesterday";
import { checkToday } from "./function/localStorage/checkToday";
import { yesterdayState } from "./function/localStorage/yesterdayState";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
yesterdayState();
checkDayBeforeYesterday();
checkToday("wakeUpTime");
checkToday("todayContent");
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

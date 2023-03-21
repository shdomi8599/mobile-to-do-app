import "../css/App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TargetPage from "../pages/TargetPage";
import SchedulePage from "../pages/SchedulePage";
import AlarmPage from "../pages/AlarmPage";
import CalendarPage from "../pages/CalendarPage";
import Nav from "./nav/Nav";
import Footer from "./common/Footer";
import React, { useMemo, useRef } from "react";
import { checkToday } from "../function/localStorage/checkTodayState";
import { yesterdayState } from "../function/localStorage/yesterdayState";
import { checkYesterday } from "../function/localStorage/checkYesterday";

const App = () => {
  //로컬 값 날짜에 맞게 1번만 실행되어 모두 정리
  const isMountedRef = useRef(false);
  if (!isMountedRef.current) {
    isMountedRef.current = true;
    yesterdayState();
    checkToday("wakeUpTime");
    checkToday("todayContent");
    checkYesterday();
  }

  //라우트에 들어갈 데이터들
  const routeArr = useMemo(
    () => [
      { path: "/", element: <MainPage /> },
      { path: "/target", element: <TargetPage /> },
      { path: "/schedule", element: <SchedulePage /> },
      { path: "/alarm", element: <AlarmPage /> },
      { path: "/calendar", element: <CalendarPage /> },
    ],
    []
  );

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Nav />
        <Routes>
          {routeArr.map((el) => (
            <Route key={el.path} path={el.path} element={el.element} />
          ))}
        </Routes>
        <Footer />
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;

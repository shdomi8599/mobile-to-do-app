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
import React, { useEffect, useMemo } from "react";
import { checkToday } from "../function/localStorage/checkTodayState";
import { yesterdayState } from "../function/localStorage/yesterdayState";
import { checkYesterday } from "../function/localStorage/checkYesterday";

const App = () => {
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

  //로컬 값 날짜에 맞게 정리해주는 이펙트
  useEffect(() => {
    yesterdayState();
    checkToday("wakeUpTime");
    checkToday("todayContent");
    // checkYesterday();
  }, []);

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

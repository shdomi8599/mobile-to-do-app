import "../css/App.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TargetPage from "../pages/TargetPage";
import SchedulePage from "../pages/SchedulePage";
import AlarmPage from "../pages/AlarmPage";
import CalendarPage from "../pages/CalendarPage";
import Nav from "./nav/Nav";
import Footer from "./common/Footer";
import React, { useEffect, useMemo } from "react";
import {
  successTargetState,
  todayTargetState,
  yesterdayContentState,
} from "../recoil/atom";
import { getLocalStorage } from "../function/localStorage/getLocalStorage";
import { addFailData } from "../function/addFailData";
import { setLocalStorage } from "../function/localStorage/setLocalStorage";
import { localState } from "../function/localStorage/localState";

const App = () => {
  console.log("배포 자동화 테스트");
  console.log("배포 자동화 테스트");
  console.log("배포 자동화 테스트");

  const setToday = useSetRecoilState(todayTargetState);
  const setYesterDay = useSetRecoilState(yesterdayContentState);
  const [successTarget, setSuccessTarget] = useRecoilState(successTargetState);
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

  //오늘,어제의 목표 리랜더링
  useEffect(() => {
    if (!getLocalStorage("todayContent")) {
      setToday(undefined);
    }
    if (!getLocalStorage("yesterdayContent")) {
      setYesterDay("");
    }
  }, [setToday, setYesterDay]);

  //실패한 데이터를 추가
  useEffect(() => {
    const failData = addFailData(successTarget);
    setSuccessTarget({ ...successTarget, ...failData });
    setYesterDay(localState("yesterdayContent", "")); //어제의 목표가 바로 적용안되서 의도적으로 한 번더 적용 시도
  }, []);

  //데이터가 변하면 달력 값 저장
  useEffect(() => {
    setLocalStorage("calendarVal", successTarget);
  }, [successTarget]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Nav />
      <Routes>
        {routeArr.map((el) => (
          <Route key={el.path} path={el.path} element={el.element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

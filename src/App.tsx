import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TargetPage from "./pages/TargetPage";
import SchedulePage from "./pages/SchedulePage";
import AlarmPage from "./pages/AlarmPage";
import CalendarPage from "./pages/CalendarPage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import React, { useMemo } from "react";

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

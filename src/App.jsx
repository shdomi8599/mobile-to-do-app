import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TargetPage from "./pages/TargetPage";
import SchedulePage from "./pages/SchedulePage";
import AlarmPage from "./pages/AlarmPage";
import CalendarPage from "./pages/CalendarPage";
import Nav from "./components/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/target" element={<TargetPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;

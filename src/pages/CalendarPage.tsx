import React from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../recoil/atom";
import Calendar from "../components/calendar/Calendar";
import ContentBox from "../components/common/ContentBox";
import MainContainer from "../components/main/MainContainer";
import Modal from "../components/common/Modal";
import SubTitleBox from "../components/common/SubTitleBox";
import TitleBox from "../components/common/TitleBox";

const CalendarPage = () => {
  //모달 상태
  const modal = useRecoilValue(modalState);

  return (
    <MainContainer>
      <TitleBox message={"달력 보기"} />
      <SubTitleBox />
      {modal && <Modal />}
      <ContentBox>
        <Calendar />
      </ContentBox>
    </MainContainer>
  );
};

export default CalendarPage;

import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, successTargetState } from "../recoil/atom";
import Calendar from "../components/Calendar";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import Modal from "../components/Modal";
import SubTitleBox from "../components/SubTitleBox";
import TitleBox from "../components/TitleBox";

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

import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modalState,
  modalValState,
  scheduleDataState,
  yesterdayContentState,
} from "../recoil/atom";
import { createTimeArr } from "../function/timeUtill/createTimeArr";
import { useLocation, useNavigate } from "react-router-dom";
import ContentBox from "../components/common/ContentBox";
import MainContainer from "../components/main/MainContainer";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  bedState,
  todayValueState,
  wakeUpTimeValState,
} from "../recoil/selector";
import { BsShareFill } from "react-icons/bs";
import TitleBox from "../components/common/TitleBox";
import MainContent from "../components/main/MainContent";
import { getLocalStorage } from "../function/localStorage/getLocalStorage";
import { setLocalStorage } from "../function/localStorage/setLocalStorage";
import Modal from "../components/common/Modal";
import { encryption } from "../function/crypto/encryption";
import { decryption } from "../function/crypto/decryption";

const SubTitle = styled.section.attrs({
  className: "d-flex justify-content-center align-items-center w-100 px-4 mb-4",
})`
  height: 10vh;
`;

const TargetBox = styled.div.attrs({
  className:
    "flex-10 d-flex justify-content-start align-items-center flex-column",
})``;

const ShareBox = styled.div.attrs({
  className: "flex-02 d-flex justify-content-end align-items-center",
})``;

const TodayTarget = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100",
})``;

const TomorrowTarget = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100",
})``;

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 공유하기를 통해 받은 데이터를 적용하는 이벤트
  const checkParams = useCallback(() => {
    if (location.search) {
      const scheduleDataString = decodeURIComponent(location.search).slice(14);
      const scheduleData = JSON.parse(scheduleDataString);
      if (window.confirm("공유받은 스케줄을 적용하시겠습니까?")) {
        setLocalStorage("scheduleData", scheduleData);
        navigate("/");
      } else {
        navigate("/");
      }
    }
  }, [location.search, navigate]);

  // 공유하기 데이터가 존재한다면 실행
  useEffect(() => {
    checkParams();
  }, [checkParams]);

  //오늘의 목표로 전달된 값
  const todayContent = useRecoilValue(todayValueState);

  //어제의 목표 값
  const yesterdayContent = useRecoilValue(yesterdayContentState);

  //기상 시간 값
  const wakeUp = useRecoilValue(wakeUpTimeValState);

  //취침 시간 값
  const bed = useRecoilValue(bedState);

  //시간 배열
  const timeArr = useMemo(() => createTimeArr(), []);
  const contentArr: number[] = useMemo(
    () =>
      bed > wakeUp
        ? timeArr.slice(wakeUp, bed)
        : timeArr.slice(wakeUp).concat(timeArr.slice(0, bed)),
    [bed, timeArr, wakeUp]
  );

  //스케줄 데이터
  const scheduleDataArr = useRecoilValue(scheduleDataState);

  //모달 상태
  const [modal, setModal] = useRecoilState(modalState);

  //모달 값 상태
  const [, setModalVal] = useRecoilState(modalValState);

  /**
   * 공유하기 링크 생성 이벤트
   */
  const shareEvent = useCallback(() => {
    const hostName = window.location.href;
    const localSchedule = getLocalStorage("scheduleData");
    if (localSchedule) {
      const data = encodeURIComponent(
        JSON.stringify(localSchedule.scheduleData)
      );
      setModalVal({ url: `${hostName}?scheduleData=${data}` });
      setModal(true);
    } else {
      alert("스케줄을 등록해주세요.");
    }
  }, [setModal, setModalVal]);

  //아이콘 메모이제이션
  const ShareIcon = React.memo(BsShareFill);

  return (
    <MainContainer>
      {modal && <Modal />}
      <TitleBox message={"취준생의 하루"} />
      <SubTitle>
        <TargetBox>
          <TodayTarget>
            <span>
              어제의 목표 :{" "}
              {yesterdayContent === "" ? "목표 미설정" : " " + yesterdayContent}
            </span>
          </TodayTarget>
          <TomorrowTarget>
            <span onClick={() => navigate("/target")}>
              오늘의 목표 :
              {!todayContent ? " 목표를 설정해주세요." : " " + todayContent}
            </span>
          </TomorrowTarget>
        </TargetBox>
        <ShareBox>
          <ShareIcon className="fs-2 pointer" onClick={shareEvent} />
        </ShareBox>
      </SubTitle>
      <ContentBox>
        {contentArr.map((time, i) => (
          <MainContent key={i} time={time} content={scheduleDataArr[time]} />
        ))}
      </ContentBox>
    </MainContainer>
  );
};

export default MainPage;

import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { scheduleDataState } from "../recoil/atom";
import { createTimeArr } from "../function/timeUtill/createTimeArr";
import { useNavigate } from "react-router-dom";
import ContentBox from "../components/common/ContentBox";
import MainContainer from "../components/main/MainContainer";
import React, { useEffect, useMemo } from "react";
import {
  bedState,
  todayValueState,
  wakeUpTimeValState,
} from "../recoil/selector";
import { BsShareFill } from "react-icons/bs";
import TitleBox from "../components/common/TitleBox";
import MainContent from "../components/main/MainContent";
import { checkToday } from "../function/localStorage/checkToday";
import { setLocalStorage } from "../function/localStorage/setLocalStorage";

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
  const navigate = useNavigate();

  //현재 날짜의 값이 아니라면 삭제
  useEffect(() => {
    checkToday("wakeUpTime");
    checkToday("todayContent");
  }, []);

  //오늘의 목표로 전달된 값
  const todayContent = useRecoilValue(todayValueState);

  //오늘의 목표 값에 따라 로컬 관리
  useEffect(() => {
    if (todayContent) {
      setLocalStorage("todayContent", todayContent);
    }
  }, [todayContent]);

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

  //아이콘 메모이제이션
  const ShareIcon = React.memo(BsShareFill);

  return (
    <MainContainer>
      <TitleBox message={"취준생의 하루"} />
      <SubTitle>
        <TargetBox>
          <TodayTarget>
            <span>어제의 목표 : 코딩 테스트</span>
          </TodayTarget>
          <TomorrowTarget>
            <span onClick={() => navigate("/target")}>
              오늘의 목표 :
              {!todayContent ? " 목표를 설정해주세요." : " " + todayContent}
            </span>
          </TomorrowTarget>
        </TargetBox>
        <ShareBox>
          <ShareIcon className="fs-2" />
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

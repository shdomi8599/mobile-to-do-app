import styled from "styled-components";
import MainContent from "../components/MainContent";
import TitleBox from "../components/TitleBox";
import { useRecoilValue } from "recoil";
import { scheduleDataState } from "../recoil/atom";
import { createTimeArr } from "../function/createTimeArr";
import { useNavigate } from "react-router-dom";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import React, { useMemo } from "react";
import {
  bedState,
  todayValueState,
  wakeUpTimeValState,
} from "../recoil/selector";
import { BsShareFill } from "react-icons/bs";
import { trackingPast } from "../function/trackingPast";
import { formatDate } from "../function/formatDate";

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
  // console.log(trackingPast(formatDate()));
  const navigate = useNavigate();
  //오늘의 목표
  const todayContent = useRecoilValue(todayValueState);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bed, wakeUp]
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
              오늘의 목표 :{" "}
              {!todayContent ? "목표를 설정해주세요." : todayContent}
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

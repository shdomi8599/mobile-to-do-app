import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { scheduleDataState, textBoxState } from "../recoil/atom";
import ContentBox from "../components/common/ContentBox";
import MainContainer from "../components/main/MainContainer";
import ScheduleContent from "../components/schedule/ScheduleContent";
import SubTitleBox from "../components/common/SubTitleBox";
import TextBox from "../components/common/TextBox";
import TitleBox from "../components/common/TitleBox";
import { createTimeArr } from "../function/timeUtill/createTimeArr";
import { SigObj } from "../type/type";
import { bedState, wakeUpTimeValState } from "../recoil/selector";
import { useLocation } from "react-router-dom";
import { setLocalStorage } from "../function/localStorage/setLocalStorage";
import { localState } from "../function/localStorage/localState";

const SchedulePage = () => {
  const location = useLocation();

  const timeArr = useMemo(() => createTimeArr(), []);

  //메인 페이지에서 선택한 시간
  const selectTime: number = location.state && location.state.time;

  //box 상태 체크
  const boxState = useRecoilValue(textBoxState);

  //기상 시간 값
  const wakeUp = useRecoilValue(wakeUpTimeValState);

  //취침 시간 값
  const bed = useRecoilValue(bedState);

  //스케줄 데이터 상태
  const [scheduleData, setScheduleData] = useRecoilState(scheduleDataState);

  //스케줄 데이터 변경
  const changeScheduleData = (data: SigObj) => {
    setScheduleData({ ...scheduleData, ...data });
  };

  //스케줄 데이터 상태가 변하면 로컬에 데이터를 저장하는 이펙트
  useEffect(() => {
    setLocalStorage("scheduleData", scheduleData);
  }, [scheduleData]);

  //텍스트 박스 상태
  const [textBox, setTextBox] = useRecoilState(textBoxState);

  /**
   * 텍스트 박스 on/off
   */
  const textBoxHandler = () => {
    setTextBox(!textBox);
  };

  //선택 상태
  const [pick, setPick] = useState(0);

  //시간 배열
  const contentArr: number[] = useMemo(
    () =>
      bed > wakeUp
        ? timeArr.slice(wakeUp, bed)
        : timeArr.slice(wakeUp).concat(timeArr.slice(0, bed)),
    [bed, timeArr, wakeUp]
  );

  /**
   * 컨텐츠의 클릭이벤트
   */
  const clickContent = (time: number) => {
    textBoxHandler();
    setPick(time);
  };

  //로컬에 포함되지 않은 데이터 배열
  const notIncludesLocal: number[] = useMemo(() => {
    return timeArr.filter((x) => !contentArr.includes(x));
  }, [contentArr, timeArr]);

  //기상,취침 시간이 변경되었을 때, 시간이 존재하지않으면 데이터 삭제
  useEffect(() => {
    const cloneLocalData = localState("scheduleData", {});
    // eslint-disable-next-line array-callback-return
    notIncludesLocal.map((x: number) => {
      delete cloneLocalData[x];
    });
    setLocalStorage("scheduleData", cloneLocalData);
  }, [bed, notIncludesLocal, wakeUp]);

  return (
    <>
      <MainContainer>
        <TitleBox message={"스케줄 설정"} />
        <SubTitleBox message={"오늘의 스케줄"} />
        <ContentBox>
          {contentArr.map((time) => (
            <ScheduleContent
              key={time}
              time={time}
              content={scheduleData[time]}
              selectTime={selectTime}
              clickContent={clickContent}
            />
          ))}
        </ContentBox>
      </MainContainer>
      {boxState && (
        <TextBox
          message={pick}
          changeScheduleData={changeScheduleData}
          textBoxHandler={textBoxHandler}
        />
      )}
    </>
  );
};

export default SchedulePage;

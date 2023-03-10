import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  bedTimeState,
  scheduleDataState,
  textBoxState,
  wakeUpTimeState,
} from "../atom";
import ScheduleContent from "../components/ScheduleContent";
import SubTitleBox from "../components/SubTitleBox";
import TextBox from "../components/TextBox";
import TitleBox from "../components/TitleBox";
import { createTimeArr } from "../function/createTimeArr";

const ScheduleBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center flex-column w-100",
})``;

const ContentBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 flex-column border-top",
})``;

const SchedulePage = () => {
  //box 상태 체크
  const boxState = useRecoilValue(textBoxState);

  //기상 시간 값
  const wakeUp = Number(useRecoilValue(wakeUpTimeState).slice(0, 2));

  //취침 시간 값
  const bed = Number(useRecoilValue(bedTimeState).slice(0, 2));

  //스케줄 데이터 상태
  const [scheduleDataArr, setScheduleDataArr] =
    useRecoilState(scheduleDataState);

  //스케줄 데이터 변경
  const changeScheduleDataArr = (data) => {
    setScheduleDataArr({ ...scheduleDataArr, ...data });
  };

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

  /**
   *시간 선택
   */
  const changePick = (time) => {
    setPick(time);
  };

  //시간 배열
  const contentArr =
    bed > wakeUp
      ? createTimeArr().slice(wakeUp, bed)
      : createTimeArr().slice(wakeUp).concat(createTimeArr().slice(0, bed));

  return (
    <>
      <ScheduleBox>
        <TitleBox message={"스케줄 설정"} />
        <SubTitleBox message={"오늘의 스케줄"} />
        <ContentBox>
          {contentArr.map((time, i) => (
            <ScheduleContent
              key={i}
              time={time}
              content={scheduleDataArr[String(time)]}
              changePick={changePick}
              textBoxHandler={textBoxHandler}
            />
          ))}
        </ContentBox>
      </ScheduleBox>
      {boxState && (
        <TextBox
          message={pick}
          changeScheduleDataArr={changeScheduleDataArr}
          textBoxHandler={textBoxHandler}
        />
      )}
    </>
  );
};

export default SchedulePage;

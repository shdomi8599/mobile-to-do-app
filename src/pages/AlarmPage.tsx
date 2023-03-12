import React from "react";
import { useRecoilState } from "recoil";
import { bedTimeState, wakeUpTimeState } from "../atom";
import AlarmContent from "../components/AlarmContent";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import SubTitleBox from "../components/SubTitleBox";
import TitleBox from "../components/TitleBox";
import { createTimeArr } from "../function/createTimeArr";
import { AlarmArr } from "../type";

const AlarmPage = () => {
  //기상 시간 상태
  const [wakeUp, setWakeUp] = useRecoilState(wakeUpTimeState);

  //취침 시간 상태
  const [bed, setBed] = useRecoilState(bedTimeState);

  //0시부터 24시까지 시간을 넣은 배열
  const timeArr = createTimeArr();

  const alarmArr:AlarmArr = [
    //설정 리스트
    { "효과음": ["닭 우는 소리", "개 짖는 소리", "파도 치는 소리"], select: 1 },
    { "진동 세기": ["1", "2", "3"], select: 1 },
    { "알람 종류": ["소리만", "진동만", "소리+진동"], select: 1 },
    { "기상 시간": [], select: Number(wakeUp.slice(0, 2)) },
    { "취침 시간": [], select: Number(bed.slice(0, 2)) },
  ];

  //기상 및 취침 시간 세팅
  for (let i of timeArr) {
    const timeLength = String(i).length;
    const data = timeLength === 1 ? `0${i}:00` : `${i}:00`;
    alarmArr[3]["기상 시간"].push(data);
    alarmArr[4]["취침 시간"].push(data);
  }

  return (
    <MainContainer>
      <TitleBox message={"알람 설정"} />
      <SubTitleBox message={"세부 설정"} />
      <ContentBox>
        {alarmArr.map((el, i) => (
          <AlarmContent
            key={i}
            category={Object.keys(el)[0]}
            valueArr={Object.values(el)[0]}
            value={Object.values(el)[0][el.select]}
            setWakeUp={setWakeUp}
            setBed={setBed}
          />
        ))}
      </ContentBox>
    </MainContainer>
  );
};

export default AlarmPage;

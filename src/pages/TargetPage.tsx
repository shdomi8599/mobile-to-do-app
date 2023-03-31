import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { targetContentValue, todayTargetState } from "../recoil/atom";
import ButtonBox from "../components/common/ButtonBox";
import ContentBox from "../components/common/ContentBox";
import MainContainer from "../components/main/MainContainer";
import SubTitleBox from "../components/common/SubTitleBox";
import TargetContent from "../components/target/TargetContent";
import TextBox from "../components/common/TextBox";
import TitleBox from "../components/common/TitleBox";
import { setLocalStorage } from "../function/localStorage/setLocalStorage";
import { removeLocalStorage } from "../function/localStorage/removeLocalStorage";
import { todayValueState } from "../recoil/selector";
import { getLocalStorage } from "../function/localStorage/getLocalStorage";

const TargetPage = () => {
  //타겟 상태
  const [targetContent, setTargetContent] = useRecoilState(targetContentValue);

  //오늘의 목표로 전달된 값
  const todayContent = useRecoilValue(todayValueState);
  console.log(targetContent);
  /**
   * 컨텐츠 추가 // 길이가 20일때 마지막거 삭제하고 추가하도록 넣음
   */
  const addTargetContent = (data: string) => {
    if (targetContent.includes(data)) {
      setBox(false);
      return alert("이미 같은 목표가 존재합니다.");
    }
    if (targetContent.length > 19) {
      setTargetContent([data, ...targetContent.slice(0, 19)]);
    } else {
      setTargetContent([data, ...targetContent]);
    }
    setBox(false);
  };

  //targetContent가 바뀔때마다 로컬에 저장하고 삭제하는 이펙트
  useEffect(() => {
    const targetData = getLocalStorage("targetContent");
    if (targetData && targetData.targetContent.length === 0) {
      removeLocalStorage("targetContent");
    } else {
      setLocalStorage("targetContent", targetContent);
    }
    if (todayContent) {
      setLocalStorage("todayContent", todayContent);
    }
  }, [targetContent, todayContent]);

  /**
   * 컨텐츠 삭제
   */
  const deleteTargetContent = (idx: number) => {
    setTargetContent([
      ...targetContent.slice(0, idx),
      ...targetContent.slice(idx + 1),
    ]);
    setToday(undefined);
  };

  //오늘의 목표 상태
  const [today, setToday] = useRecoilState(todayTargetState);

  //오늘의 목표가 없다면 로컬에서 삭제
  useEffect(() => {
    if (today === undefined) {
      removeLocalStorage("todayContent");
    }
  }, [today]);

  /**
   * 오늘의 목표 변경
   */
  const changeTodayTarget = (idx: number) => {
    setToday(idx);
  };

  //목표 등록 박스 상태
  const [box, setBox] = useState(false);

  /**
   * 박스 상태 on/off
   */
  const boxHandler = () => {
    setBox(!box);
  };

  return (
    <>
      <MainContainer>
        <TitleBox message={"목표 설정"} />
        <section className="d-flex justify-content-start align-items-center w-100">
          <SubTitleBox message={"최근 20개의 목표"} />
          <div className="d-flex justify-content-end align-items-center w-100 pe-3 pb-3">
            <ButtonBox buttonEvent={boxHandler} message={"목표 등록"} />
          </div>
        </section>
        <ContentBox>
          {targetContent.map((val, i) => (
            <TargetContent
              message={val}
              key={val + i}
              idx={i}
              today={today}
              deleteTargetContent={deleteTargetContent}
              changeTodayTarget={changeTodayTarget}
            />
          ))}
        </ContentBox>
      </MainContainer>
      {box && (
        <TextBox message={"목표 등록"} addTargetContent={addTargetContent} />
      )}
    </>
  );
};

export default TargetPage;

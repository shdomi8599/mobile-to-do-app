import { isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkDate } from "../function/checkDate";
import { modalState, startDateState, successTargetState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  getUpTimeState,
  todayValueState,
  yearMonthState,
} from "../recoil/selector";
import styled from "styled-components";
import { currentDate } from "../function/todayDate";

const CheckedSpan = styled.span.attrs({
  className: "pointer border p-1 rounded text-white",
})<CheckedSpanProps>`
  background-color: ${(props) =>
    props.checkTarget === "성공" ? "rgb(102, 102, 245)" : "rgb(235, 94, 84)"};
`;

const TodaySpan = styled.span.attrs({
  className: "pointer border p-1 rounded",
})``;

type CheckedSpanProps = {
  checkTarget: string;
};

const CalendarTd = ({
  formattedDate,
  tdIdx,
  trIdx,
}: {
  formattedDate: string;
  tdIdx: number;
  trIdx: number;
}) => {
  const navigate = useNavigate();

  //현재 선택되있는 달력 상태 값
  const startDate = useRecoilValue(startDateState);

  //현재 선택되있는 달력 값 달 시작 날짜
  const monthStart = startOfMonth(startDate);

  //현재 선택되있는 달력의 주 첫번째 날짜
  const firstDate = startOfWeek(monthStart);

  //년,월 값
  const [year, month] = useRecoilValue(yearMonthState);

  //모달 상태
  const [, setModal] = useRecoilState(modalState);

  /**
   * 모달 on
   */
  const openModal = (getDate: string, checkTarget: string[]) => {
    if (Object.keys(target).includes(getDate)) {
      setModal(true);
      navigate("", {
        state: {
          check: checkTarget[0],
          target: checkTarget[1],
          time: checkTarget[2],
        },
      });
    }
  };

  //저장된 목표 값들의 상태
  const [target, setTarget] = useRecoilState(successTargetState);

  //오늘의 목표 값
  const todayTarget = useRecoilValue(todayValueState);

  //기상 시간 값
  const getUpTime = useRecoilValue(getUpTimeState);

  /**
   * 목표를 성공하면 값을 추가, 하루 안에 성공을 안누르면 자동으로 실패가 쌓이도록 만들어야될듯?
   */
  const addTarget = (date: string) => {
    if (!todayTarget && !getUpTime) {
      return alert("기상 체크와 오늘의 목표를 먼저 등록해주세요.");
    }
    if (!todayTarget) {
      return alert("오늘의 목표를 먼저 등록해주세요.");
    }
    if (!getUpTime) {
      return alert("기상 체크를 먼저 해주세요.");
    }
    if (window.confirm("오늘 목표를 성공하셨나요?")) {
      setTarget({
        ...target,
        [`${date}`]: ["성공", todayTarget, getUpTime],
      });
    }
  };

  //날짜값 가져오기
  const day = new Date(firstDate);

  //날짜값을 계속해서 1씩 더해주기 위한 작업
  day.setDate(firstDate.getDate() + 7 * trIdx + tdIdx);

  //날짜값을 달에 맞게 string화
  const getDate = checkDate(formattedDate, year, month, day, monthStart);

  //목표값이 설정된 날짜가 있는지 체크
  const checkTarget = target[getDate];

  //오늘 날짜
  const today = currentDate();

  return (
    <td
      className={`flex-grow-1 d-flex justify-content-start align-items-center flex-column w-100 ${
        !isSameMonth(day, monthStart) && "disabled"
      }`}
      onClick={() => {
        openModal(getDate, checkTarget);
      }}
    >
      <div className="pb-1">
        <span>{formattedDate}</span>
      </div>
      {checkTarget ? (
        <div>
          <CheckedSpan checkTarget={checkTarget[0]}>
            {checkTarget[0]}
          </CheckedSpan>
        </div>
      ) : getDate === today ? (
        <div>
          <TodaySpan onClick={() => addTarget(getDate)}>성공</TodaySpan>
        </div>
      ) : (
        <></>
      )}
    </td>
  );
};

export default CalendarTd;

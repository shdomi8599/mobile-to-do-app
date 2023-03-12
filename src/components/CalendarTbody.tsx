import styled from "styled-components";
import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, addDays } from "date-fns";
import {
  getUpState,
  getUpTimeState,
  modalState,
  startDateState,
  successTargetState,
  todayValueState,
  yearMonthState,
} from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import React, { useMemo } from "react";
import { checkDate } from "../function/checkDate";
import { currentDate } from "../function/todayDate";
import { useNavigate } from "react-router-dom";
import { currentTime } from "../function/ currentTime";

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 12vh;
`;

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

const CalendarTbody = () => {
  const navigate = useNavigate();
  //현재 선택되있는 달력 상태 값
  const startDate = useRecoilValue(startDateState);

  //현재 선택되있는 달력 값 달 시작 날짜
  const monthStart = useMemo(() => {
    return startOfMonth(startDate);
  }, [startDate]);

  //현재 선택되있는 달력 값 달 마지막 날짜
  const monthEnd = useMemo(() => {
    return endOfMonth(monthStart);
  }, [monthStart]);
  // endOfMonth(monthStart);
  //현재 선택되있는 달력의 주 첫번째 날짜
  const firstDate = useMemo(() => {
    return startOfWeek(monthStart);
  }, [monthStart]);

  //현재 선택되있는 달력의 이번 주 마지막 날짜
  const endDate = useMemo(() => {
    return endOfWeek(monthEnd);
  }, [monthEnd]);

  //년,월 값
  const [year, month] = useRecoilValue(yearMonthState);

  //저장된 목표 값들의 상태
  const [target, setTarget] = useRecoilState(successTargetState);

  //오늘의 목표 값
  const todayTarget = useRecoilValue(todayValueState);

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

  //기상 상태
  const [getUp, setGetUp] = useRecoilState(getUpState);

  //기상 시간 값
  const getUpTime = useRecoilValue(getUpTimeState);

  /**
   * 목표를 성공하면 값을 추가, 하루 안에 성공을 안누르면 자동으로 실패가 쌓이도록 만들어야될듯?
   */
  const addTarget = (date: string) => {
    if (window.confirm("오늘 목표를 성공하셨나요?")) {
      if (getUp && getUpTime) {
        setTarget({
          ...target,
          [`${date}`]: ["성공", todayTarget, getUpTime],
        });
      } else {
        setGetUp(true);
        setTarget({
          ...target,
          [`${date}`]: ["성공", todayTarget, currentTime()],
        });
      }
    }
  };

  //td를 모두 담은 배열
  const rows: JSX.Element[] = [];

  //1주 값을 담을 배열
  let days: JSX.Element[] = [];
  let day = firstDate;
  let formattedDate = "";
  const today = currentDate();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const getDate = checkDate(formattedDate, year, month, day, monthStart);
      const checkTarget = target[getDate];
      days.push(
        <td
          className={`flex-grow-1 d-flex justify-content-start align-items-center flex-column w-100 ${
            !isSameMonth(day, monthStart) && "disabled"
          }`}
          key={uuidv4()}
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
      day = addDays(day, 1);
    }
    rows.push(<BodyTr key={uuidv4()}>{days}</BodyTr>);
    days = [];
  }

  return (
    <>
      <tbody className="w-100">{rows}</tbody>
    </>
  );
};

export default CalendarTbody;

import { isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  modalState,
  modalValState,
  startDateState,
  successTargetState,
} from "../../recoil/atom";
import {
  getUpTimeState,
  todayValueState,
  yearMonthState,
} from "../../recoil/selector";
import { LocalGetUp } from "../../type/type";
import { checkDate } from "../../function/timeUtill/checkDate";
import { currentDate } from "../../function/timeUtill/currentDate";
import { getLocalStorage } from "../../function/localStorage/getLocalStorage";
import { setLocalStorage } from "../../function/localStorage/setLocalStorage";

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

type CalendarTdProps = {
  formattedDate: string;
  tdIdx: number;
  trIdx: number;
};

const CalendarTd = ({ formattedDate, tdIdx, trIdx }: CalendarTdProps) => {
  //현재 선택되있는 달력 상태 값
  const startDate = useRecoilValue(startDateState);

  //현재 선택되있는 달력 값 달 시작 날짜
  const monthStart = useMemo(() => startOfMonth(startDate), [startDate]);

  //현재 선택되있는 달력의 주 첫번째 날짜
  const firstDate = useMemo(() => startOfWeek(monthStart), [monthStart]);

  //년,월 값
  const [year, month] = useRecoilValue(yearMonthState);

  //저장된 목표 값들의 상태
  const [target, setTarget] = useRecoilState(successTargetState);

  //오늘의 목표 값
  const todayTarget = useRecoilValue(todayValueState);

  //기상 시간 값
  const getUpTime = useRecoilValue(getUpTimeState);

  //모달 상태
  const [, setModal] = useRecoilState(modalState);

  //모달 값 상태
  const [, setModalVal] = useRecoilState(modalValState);

  /**
   * 모달 on
   */
  const openModal = useCallback(
    (getDate: string, checkTarget: string[]) => {
      if (Object.keys(target).includes(getDate)) {
        setModal(true);
        setModalVal({
          check: checkTarget[0],
          target: checkTarget[1],
          time: checkTarget[2],
        });
      }
    },
    [setModal, setModalVal, target]
  );

  /**
   * 목표를 성공하면 값을 추가
   */
  const addTarget = useCallback(
    (date: string) => {
      const localGetUp: LocalGetUp | null = getLocalStorage("wakeUpTime");
      if (!todayTarget && !getUpTime && !localGetUp) {
        return alert("기상 체크와 오늘의 목표를 먼저 등록해주세요.");
      }
      if (!todayTarget) {
        return alert("오늘의 목표를 먼저 등록해주세요.");
      }
      if (!getUpTime && !localGetUp) {
        return alert("기상 체크를 먼저 해주세요.");
      }
      if (window.confirm("오늘 목표를 성공하셨나요?")) {
        if (localGetUp) {
          const data = {
            ...target,
            [`${date}`]: ["성공", todayTarget, localGetUp.wakeUpTime],
          };
          setTarget(data);
          setLocalStorage("calendarVal", data);
        } else if (getUpTime) {
          const data = {
            ...target,
            [`${date}`]: ["성공", todayTarget, getUpTime],
          };
          setTarget(data);
          setLocalStorage("calendarVal", data);
        }
      }
    },
    [getUpTime, setTarget, target, todayTarget]
  );

  //날짜값 가져오기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const day = new Date(firstDate);

  //날짜값을 계속해서 1씩 더해주기 위한 작업
  day.setDate(firstDate.getDate() + 7 * trIdx + tdIdx);

  //날짜값을 달에 맞게 string화
  const getDate = useMemo(
    () => checkDate(formattedDate, year, month, day, monthStart),
    [day, formattedDate, month, monthStart, year]
  );

  //목표값이 설정된 날짜가 있는지 체크
  const checkTarget = useMemo(() => target[getDate], [getDate, target]);

  //오늘 날짜
  const today = useMemo(() => currentDate(), []);

  useEffect(() => {}, []);

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

export default React.memo(CalendarTd);

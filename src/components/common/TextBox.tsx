import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { createTimeArr } from "../../function/timeUtill/createTimeArr";
import { bedTimeState, textState } from "../../recoil/atom";
import { SigObj } from "../../type/type";
import ButtonBox from "./ButtonBox";

const textBoxFade = keyframes`
    0% {
      transform: translate(0, 100px);
    }
    100% {
      transform: translate(0, 0);
    }
`;

const TargetTextBox = styled.div.attrs({
  className:
    "position-fixed d-flex justify-content-center align-items-center  flex-column px-5 py-3 border-top border-bottom bg-white w-100",
})`
  bottom: 0px;
  animation: ${textBoxFade} 0.1s linear alternate;
`;

const TextTitle = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100 pb-2 fs-2",
})``;

const InputBox = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100",
})``;

const SelectBox = styled.select.attrs({
  className: "w-100 me-1",
})`
  font-size: 0.9rem;
`;

type TextBoxProps = {
  message: number | string;
  addTargetContent?: (data: string) => void;
  changeScheduleData?: (scheduleData: SigObj) => void;
  textBoxHandler?: () => void;
};

const TextBox = ({
  message,
  addTargetContent,
  changeScheduleData,
  textBoxHandler,
}: TextBoxProps) => {
  //메세지 변경
  const changeMessage = changeScheduleData
    ? message < 12
      ? `오전 ${message}:00`
      : `오후 ${message}:00`
    : message;

  //텍스트 상태
  const [text, setText] = useRecoilState(textState);

  //옵션 상태
  const [option, setOption] = useState(`${message}:00`);

  //취침 시간 상태
  const bedTime = useRecoilValue(bedTimeState);

  /**
   * 옵션을 바꿔주는 함수
   */
  const changeOption = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOption(e.target.value);
  };

  //선택된 시간보다 뒤의 시간 옵션val을 생성하기 위한 함수
  const optionVal = createTimeArr().map((time) => {
    time = String(time);
    if (time.length !== 1) {
      time = `${time}:00`;
      return time;
    } else {
      time = `0${time}:00`;
      return time;
    }
  });

  /**
   * 텍스트 change 이벤트
   */
  const changeText = (e: {
    target: { value: string | ((currVal: string) => string) };
  }) => {
    setText(e.target.value);
  };

  /**
   * 목표,스케줄 등록 이벤트
   * 타입때문에 코드가 많이 더러워져서 나중에 리팩토링해야할듯
   */
  const sumbitText = () => {
    if (text.length === 0) {
      return alert("1글자 이상 작성해주세요.");
    }
    if (addTargetContent) {
      addTargetContent(text);
      return setText("");
    }
    if (typeof message === "number" && changeScheduleData && textBoxHandler) {
      const data = [];
      for (let i = message; i < Number(option.slice(0, 2)) + 1; i++) {
        const scheduleData = { [`${i}`]: text };
        data.push(scheduleData);
      }
      if (data.length === 0) {
        changeScheduleData({ [`${message}`]: text });
      } else {
        const mergeData: {} = Object.assign({}, ...data);
        changeScheduleData(mergeData);
      }
      textBoxHandler();
      return setText("");
    }
  };

  return (
    <TargetTextBox>
      <TextTitle>
        <div className="flex-07">{changeMessage}</div>
        <div className="flex-04 d-flex justify-content-center align-items-center">
          {typeof message === "number" && (
            <SelectBox onChange={changeOption}>
              {optionVal
                .slice(message, Number(bedTime.slice(0, 2)))
                .map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
            </SelectBox>
          )}
        </div>
        <ButtonBox
          message={"등록"}
          addStyle={"flex-03 fs-5"}
          buttonEvent={sumbitText}
        />
      </TextTitle>
      <InputBox>
        <input
          onChange={changeText}
          value={text}
          type="text"
          maxLength={10}
          className="form-control"
          placeholder="10글자 이내로 작성해주세요."
        />
      </InputBox>
    </TargetTextBox>
  );
};

export default React.memo(TextBox);

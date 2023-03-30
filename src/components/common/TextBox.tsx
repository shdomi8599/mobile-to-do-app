import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { createTimeArr } from "../../function/timeUtill/createTimeArr";
import { textState } from "../../recoil/atom";
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
  //텍스트 상태
  const [text, setText] = useRecoilState(textState);

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
   */
  const sumbitText = () => {
    if (text.length === 0) {
      return alert("1글자 이상 작성해주세요.");
    }
    if (addTargetContent) {
      addTargetContent(text);
      return setText("");
    }
    if (changeScheduleData && textBoxHandler) {
      const scheduleData = { [`${message}`]: text };
      changeScheduleData(scheduleData);
      textBoxHandler();
      return setText("");
    }
  };

  //메세지 변경
  const changeMessage = changeScheduleData
    ? message < 12
      ? `오전 ${message}:00`
      : `오후 ${message}:00`
    : message;

  const optionVal = useMemo(() => {
    return createTimeArr()
      .map(String)
      .map((time) => {
        if (time.length !== 1) {
          time = `${time}:00`;
          return time;
        } else {
          time = `0${time}:00`;
          return time;
        }
      });
  }, []);

  return (
    <TargetTextBox>
      <TextTitle>
        <div className="flex-07">{changeMessage}</div>
        <div className="flex-04 d-flex justify-content-center align-items-center">
          {typeof message === "number" && (
            <SelectBox>
              {optionVal.map((time) => (
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

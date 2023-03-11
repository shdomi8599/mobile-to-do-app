import { useRecoilState } from "recoil";
import styled from "styled-components";
import { textState } from "../atom";
import ButtonBox from "./ButtonBox";

const TargetTextBox = styled.div.attrs({
  className:
    "position-fixed d-flex justify-content-center align-items-center  flex-column px-5 py-3 border-top border-bottom bg-white w-100",
})`
  bottom: 0px;
  width: 360px;
`;

const TextTitle = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100 pb-2 fs-2",
})``;

const InputBox = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100",
})``;

const TextBox = ({
  message,
  addTargetContent,
  changeScheduleDataArr,
  textBoxHandler,
}) => {
  //텍스트 상태
  const [text, setText] = useRecoilState(textState);

  /**
   * 텍스트 change 이벤트
   */
  const changeText = (e) => {
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
    if (changeScheduleDataArr) {
      const scheduleData = { [`${message}`]: text };
      changeScheduleDataArr(scheduleData);
      textBoxHandler();
      return setText("");
    }
  };

  //메세지 변경
  const changeMessage = changeScheduleDataArr
    ? message < 12
      ? `오전 ${message}:00`
      : `오후 ${message}:00`
    : message;

  return (
    <TargetTextBox>
      <TextTitle>
        <div className="flex-08">{changeMessage}</div>
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
          maxLength="10"
          className="form-control"
          placeholder="10글자 이내로 작성해주세요."
        />
      </InputBox>
    </TargetTextBox>
  );
};

export default TextBox;

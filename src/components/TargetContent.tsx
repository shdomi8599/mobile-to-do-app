import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Content = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 border-bottom",
})`
  height: 10vh;
`;

const MainContentBox = styled.div.attrs({
  className: "flex-10 d-flex justify-content-start align-items-center  h-100",
})``;

const TodayMark = styled.span.attrs({
  className: "p-1 rounded border",
})<TodayMarkProps>`
  color: ${(props) => (props.idx === props.today ? "white" : "black")};
  background-color: ${(props) => (props.idx === props.today ? "red" : "white")};
  font-size: 0.7rem;
`;

type TodayMarkProps = {
  readonly idx: number;
  readonly today: number;
};

type TargetContentProps = {
  message: string;
  deleteTargetContent: (idx: number) => void;
  today: number;
  changeTodayTarget: (idx: number) => void;
  idx: number;
};

const TargetContent = ({
  message,
  deleteTargetContent,
  today,
  changeTodayTarget,
  idx,
}: TargetContentProps) => {
  //input 타겟
  const targetInput = useRef<HTMLInputElement>(null);

  //글 수정 상태
  const [edit, setEdit] = useState(false);

  /**
   * 글 수정 on/off
   */
  const editHandler = () => {
    setEdit(!edit);
  };

  //메세지 val 상태
  const [messageContent, setMessageContent] = useState(message);

  /**
   *change 메세지 val
   */
  const changeMessageContent = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessageContent(e.target.value);
  };

  /**
   * input 포커스 이벤트
   */
  const focusInput = () => {
    targetInput.current && targetInput.current.focus();
  };

  /**
   * 1글자 이상 작성하지않으면 다시 포커스
   */
  const blurEvent = () => {
    if (messageContent.length === 0) {
      alert("1글자 이상 작성해주세요");
      return setTimeout(() => {
        focusInput();
      }, 50);
    }
    editHandler();
  };

  //메세지가 바뀔때마다 다시 설정
  useEffect(() => {
    setMessageContent(message);
  }, [message]);

  //input이 포커스 될 수 있도록 이펙트 설정
  useEffect(() => {
    edit && focusInput();
  }, [edit]);

  //아이콘 메모이제이션
  const XIcon = React.memo(AiOutlineClose);

  return (
    <Content>
      <MainContentBox>
        <div className="d-flex justify-content-center align-items-start h-100 p-2 flex-04">
          <TodayMark
            idx={idx}
            today={today}
            onClick={() => changeTodayTarget(idx)}
          >
            오늘의 목표
          </TodayMark>
        </div>
        <div className="flex-10 d-flex justify-content-center align-items-start w-100">
          {edit ? (
            <input
              type="text"
              ref={targetInput}
              maxLength={10}
              placeholder="10글자 이내로 작성해주세요."
              className="text-center w-75"
              value={messageContent}
              onChange={changeMessageContent}
              onBlur={blurEvent}
            />
          ) : (
            <span onClick={editHandler}>{messageContent}</span>
          )}
        </div>
        <div className="flex-04 d-flex justify-content-end align-items-start pe-3 pt-2 h-100">
          <XIcon
            onClick={() => deleteTargetContent(idx)}
            className="pointer fs-5"
          />
        </div>
      </MainContentBox>
    </Content>
  );
};

export default TargetContent;

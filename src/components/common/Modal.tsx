import React, { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { modalState, modalValState } from "../../recoil/atom";
import { AiOutlineClose } from "react-icons/ai";

const Background = styled.div.attrs({
  className: "position-absolute w-100 ",
})<ModalBoxProps>`
  top: 0px;
  height: ${(props) => `${props.bodyHeight}px`};
  z-index: 1;
`;

const ModalContent = styled.div.attrs({
  className:
    "position-absolute bg-white border shadow w-50 d-flex  flex-column",
})`
  height: 17%;
  z-index: 2;
  top: 40%;
`;

const CheckedSpan = styled.span.attrs({
  className: "pointer border p-1 rounded text-white",
})<CheckedSpanProps>`
  background-color: ${(props) =>
    props.checkTarget === "성공" ? "rgb(102, 102, 245)" : "rgb(235, 94, 84)"};
`;

type CheckedSpanProps = {
  checkTarget: string;
};

type ModalBoxProps = {
  bodyHeight: number;
};

const Modal = () => {
  //바디의 높이
  const bodyHeight = useMemo(() => document.body.offsetHeight, []);

  //모달 상태
  const [, setModal] = useRecoilState(modalState);

  //모달 값
  const modalVal = useRecoilValue(modalValState);

  /**
   * 모달 off
   */
  const closeModal = useCallback(() => {
    setModal(false);
  }, [setModal]);

  //성공 여부
  const check: string = modalVal.check;

  //목표 값
  const target: string = modalVal.target;

  //기상 시간 값
  const time: string = modalVal.time;

  //공유하기용 url 값
  const url: string = useMemo(() => modalVal.url, [modalVal]);

  /**
   * url 복사 이벤트
   */
  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    alert("복사되었습니다.");
  };

  //아이콘 메모이제이션
  const XIcon = React.memo(AiOutlineClose);

  return (
    <>
      <Background bodyHeight={bodyHeight} onClick={closeModal}></Background>
      <ModalContent>
        <div className="h-25 text-end pt-2 pe-2">
          <XIcon onClick={closeModal} className="fs-4 pointer" />
        </div>
        <div className="h-100 d-flex justify-content-start align-items-center w-100 flex-column">
          {url ? (
            <>
              <div>스케줄 공유</div>
              <div className="pt-2 d-flex justify-content-center align-items-center flex-column">
                <div className="pb-1">url</div>
                <button
                  type="button"
                  className="btn btn-dark p-1"
                  onClick={copyUrl}
                >
                  복사하기
                </button>
              </div>
            </>
          ) : (
            <>
              <div>{`<목표>`}</div>
              <div>{!target ? "목표 미설정" : target}</div>
              <div className="pt-1">
                <CheckedSpan checkTarget={check}>{check}</CheckedSpan>
              </div>
              <div className="pt-1">
                {time === "미출석" ? "미출석" : `${time} 기상`}
              </div>
            </>
          )}
        </div>
      </ModalContent>
    </>
  );
};

export default Modal;

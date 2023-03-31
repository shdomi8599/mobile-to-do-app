import React, { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { alertModalState, alertModalValState } from "../../recoil/atom";
import { AiOutlineClose } from "react-icons/ai";

const Background = styled.div.attrs({
  className: "position-absolute w-100",
})<ModalBoxProps>`
  top: 0px;
  height: ${(props) => `${props.bodyHeight}px`};
  z-index: 1;
`;

const ModalContent = styled.div.attrs({
  className:
    "position-absolute bg-white border shadow w-50 d-flex flex-column ",
})`
  height: 17%;
  z-index: 2;
  top: 40%;
  transform: translate(50%, 0%);
`;

const CheckedSpan = styled.span.attrs({
  className: "pointer border p-1 rounded  mx-2",
})`
  :hover {
    color: white;
    background-color: black;
  }
`;

const ModalValSpan = styled.span`
  font-size: 0.8rem;
`;

type ModalBoxProps = {
  bodyHeight: number;
};

const AlertModal = ({ accept }: { accept: () => void }) => {
  //바디의 높이
  const bodyHeight = useMemo(() => document.body.offsetHeight, []);

  //모달 상태
  const [, alertModal] = useRecoilState(alertModalState);

  //모달 값
  const alertModalValue = useRecoilValue(alertModalValState);

  /**
   * 모달 off
   */
  const closeModal = useCallback(() => {
    alertModal(false);
  }, [alertModal]);

  //아이콘 메모이제이션
  const XIcon = React.memo(AiOutlineClose);

  return (
    <>
      <Background bodyHeight={bodyHeight} onClick={closeModal}></Background>
      <ModalContent>
        <div className="h-25 w-100 text-end pt-2 pe-2">
          <XIcon onClick={closeModal} className="fs-4 pointer" />
        </div>
        <div className="h-75 d-flex justify-content-start align-items-center w-100 flex-column">
          <div>
            <ModalValSpan>{alertModalValue}</ModalValSpan>
          </div>
          <div className="pt-4">
            <CheckedSpan onClick={accept}>예</CheckedSpan>
            <CheckedSpan onClick={closeModal}>아니오</CheckedSpan>
          </div>
        </div>
      </ModalContent>
    </>
  );
};

export default AlertModal;

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { navState } from "../recoil/atom";

const Title = styled.header.attrs({
  className: "fs-1 mb-4 w-100 d-flex justify-content-center align-items-center",
})``;

const TitleMessage = styled.h1.attrs({
  className: "bg-dark rounded text-white p-2",
})``;

type TitleBoxProps = {
  message: string;
  navHandler?: () => void;
};

const TitleBox = ({ message, navHandler }: TitleBoxProps) => {
  const navigate = useNavigate();

  //네비 상태
  const [nav, setNav] = useRecoilState(navState);

  /**
   * 네비 클릭 이벤트
   */
  const clickEvent = useCallback(() => {
    setNav(!nav);
    navigate("/");
  }, [navigate, setNav]);

  return (
    <Title>
      {navHandler ? (
        <>
          <TitleMessage onClick={clickEvent}>{message}</TitleMessage>
        </>
      ) : (
        <TitleMessage>{message}</TitleMessage>
      )}
    </Title>
  );
};

export default React.memo(TitleBox);

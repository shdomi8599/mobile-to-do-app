import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { targetContentLength } from "../recoil/selector";

const MainBox = styled.div.attrs({
  id: "container",
  className:
    "d-flex justify-content-start align-items-center flex-column w-100 ",
})<MainBoxProps>`
  ${(props) =>
    props.pathName === "/target" && props.targetLength < 6
      ? `min-height: calc(100vh - 25vh);`
      : `min-height: calc(100vh - 21vh);`}
`;

type MainContainerProps = {
  children: React.ReactNode;
};

type MainBoxProps = {
  readonly pathName: string;
  readonly targetLength: number;
};

const MainContainer = ({ children }: MainContainerProps) => {
  const location = useLocation();

  //경로 이름
  const pathName = location.pathname;

  //등록된 목표의 개수
  const targetLength = useRecoilValue(targetContentLength);

  return (
    <MainBox pathName={pathName} targetLength={targetLength}>
      {children}
    </MainBox>
  );
};

export default MainContainer;

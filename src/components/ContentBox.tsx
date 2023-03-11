import React from "react";
import styled from "styled-components";

const ContentSection = styled.main.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 flex-column border-top",
})``;

type ContentBoxProps = {
  children: React.ReactNode;
};

const ContentBox = ({ children }: ContentBoxProps) => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentBox;

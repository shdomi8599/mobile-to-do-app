import styled from "styled-components";

const ContentSection = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 flex-column border-top",
})``;

const ContentBox = ({ children }) => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentBox;

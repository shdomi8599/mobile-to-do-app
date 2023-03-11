import styled from "styled-components";

const MainBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center flex-column w-100",
})``;

const MainContainer = ({ children }) => {
  return <MainBox>{children}</MainBox>;
};

export default MainContainer;

import styled from "styled-components";

const Content = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 py-3 border-bottom",
})``;

const MainContentBox = styled.div.attrs({
  className:
    "flex-10 d-flex justify-content-start align-items-center px-4 w-100",
})``;

const ScheduleContent = ({ time, content, textBoxHandler, changePick }) => {
  //시간 길이 체크
  const timeLength = String(time).length;

  /**
   * 박스 상태를 변경하고 pick number를 변경하는 이벤트
   */
  const clickEvent = () => {
    textBoxHandler();
    changePick(time);
  };

  return (
    <Content>
      <MainContentBox onClick={clickEvent}>
        <div className="me-2">
          <span>{timeLength === 1 ? <>0{time}</> : time}:00</span> :
        </div>
        <div>
          <span>{!content ? "계획을 등록해주세요." : content}</span>
        </div>
      </MainContentBox>
    </Content>
  );
};

export default ScheduleContent;

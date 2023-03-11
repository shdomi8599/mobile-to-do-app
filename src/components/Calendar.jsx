import styled from "styled-components";
import CalendarTbody from "./CalendarTbody";

const HeadTh = styled.th.attrs({
  className: "flex-grow-1 text-center",
})`
  color: ${(props) =>
    (props.date === "일" && "red") || (props.date === "토" && "blue")};
`;

const Calendar = () => {
  const dateArr = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <table className="d-flex justify-content-center align-items-center w-100 flex-column">
      <thead className="w-100">
        <tr className="d-flex w-100 pb-2">
          {dateArr.map((date) => (
            <HeadTh key={date} date={date}>
              {date}
            </HeadTh>
          ))}
        </tr>
      </thead>
      <CalendarTbody />
    </table>
  );
};

export default Calendar;

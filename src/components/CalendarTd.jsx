import styled from "styled-components";

const CheckedSpan = styled.span.attrs({
  className: "pointer bg-dark text-white border p-1 rounded",
})``;

const CalendarTd = () => {
  return (
    <td className="flex-grow-1 d-flex justify-content-start align-items-center flex-column">
      <div>
        <span>1</span>
      </div>
      <div>
        <CheckedSpan>성공</CheckedSpan>
      </div>
    </td>
  );
};

export default CalendarTd;

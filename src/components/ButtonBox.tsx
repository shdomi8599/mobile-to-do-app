import React from "react";

type ButtonBoxProps = {
  message: string;
  addStyle?: string;
  buttonEvent: () => void;
};

const ButtonBox = ({ message, addStyle, buttonEvent }: ButtonBoxProps) => {
  return (
    <div
      className={`d-flex justify-content-end align-items-center ${addStyle}`}
    >
      <button type="button" className="btn btn-dark" onClick={buttonEvent}>
        {message}
      </button>
    </div>
  );
};

export default ButtonBox;

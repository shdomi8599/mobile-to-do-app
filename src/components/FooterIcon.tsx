import React from "react";
import { FooterIconData } from "../type";

type FooterIconProps = {
  data: FooterIconData;
};

const FooterIcon = ({ data }: FooterIconProps) => {
  const { href, name, src } = data;
  return (
    <div className="flex-10 d-flex justify-content-center align-items-center">
      <a href={href} target="_blank" rel="noreferrer">
        <img alt={name} src={src} />
      </a>
    </div>
  );
};

export default FooterIcon;

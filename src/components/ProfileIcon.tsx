import React from "react";
import { ProfileIconData } from "../type/type";

type ProfileIconProps = {
  data: ProfileIconData;
};

const ProfileIcon = ({ data }: ProfileIconProps) => {
  const { href, name, src } = data;
  return (
    <div className="flex-10 d-flex justify-content-center align-items-center">
      <a href={href} target="_blank" rel="noreferrer">
        <img alt={name} src={src} />
      </a>
    </div>
  );
};

export default ProfileIcon;

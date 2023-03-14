import React, { useMemo } from "react";
import { ProfileIconData } from "../type/type";

type ProfileIconProps = {
  addStyle?: string;
  addSpanStyle: string;
};

const ProfileIcon = ({ addStyle, addSpanStyle }: ProfileIconProps) => {
  const profileIcon: ProfileIconData[] = useMemo(
    () => [
      {
        href: "https://github.com/shdomi8599",
        name: "GITHUB",
        src: "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white",
      },
      {
        href: "https://mail.google.com/mail/u/0/?fs=1&to=shdomi8599@gmail.com&tf=cm",
        name: "GMAIL",
        src: "https://img.shields.io/badge/GMAIL-4285F4?style=for-the-badge&logo=Google&logoColor=white",
      },
      {
        href: "https://web-beginner.tistory.com/",
        name: "TISTORY",
        src: "https://img.shields.io/badge/Tistory-000000?style=for-the-badge&logo=Tistory&logoColor=white",
      },
    ],
    []
  );

  return (
    <div
      className={`flex-10 d-flex justify-content-center align-items-center ${addStyle}`}
    >
      {profileIcon.map((data) => (
        <span className={`${addSpanStyle}`} key={data.name}>
          <a href={data.href} target="_blank" rel="noreferrer">
            <img alt={data.name} src={data.src} />
          </a>
        </span>
      ))}
    </div>
  );
};

export default React.memo(ProfileIcon);

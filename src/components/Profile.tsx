import React, { useMemo } from "react";

const Profile = () => {
  const profile = useMemo(
    () => ["코드스테이츠 프론트엔드 43기", "만든 사람 : 신동민"],
    []
  );

  return (
    <>
      {profile.map((data) => (
        <div key={data}>{data}</div>
      ))}
    </>
  );
};

export default React.memo(Profile);

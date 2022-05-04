import { useState } from "react";

const useChkID = (userInputData) => {
  const [chkID, setChkId] = useState([]);

  const userID = userInputData.userID;
  const userPW = userInputData.userPW;

  const req = {
    userID,
    userPW,
  };

  const chkIDSubmit = async () => {
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.chkID) {
          alert("이미 사용중인 아이디입니다.");
          return setChkId(false);
        } else {
          alert("사용 가능한 아이디입니다.");
          return setChkId(true);
        }
      })
      .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
      });
  };
  return [chkID, chkIDSubmit, setChkId];
};

export default useChkID;

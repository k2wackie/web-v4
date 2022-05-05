import { useState } from "react";

const useChkID = (userInputData) => {
  const [chkID, setChkId] = useState([]);

  const userEmailInput = userInputData.userEmailInput;

  const userEmail = userInputData.userEmail;
  const userPW = userInputData.userPW;
  const req = {
    userEmail,
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
          userEmailInput.current.focus();
          alert("이미 사용중인 이메일입니다.");
          return setChkId(false);
        } else if (userEmail === "") {
          userEmailInput.current.focus();
          alert("이메일을 입력해 주세요.");
          return setChkId(true);
        } else if (![userEmail].join().split("").includes("@")) {
          userEmailInput.current.focus();
          alert("Email이 올바르지 않습니다.");
        } else {
          alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
      });
  };
  return [chkID, chkIDSubmit, setChkId];
};

export default useChkID;

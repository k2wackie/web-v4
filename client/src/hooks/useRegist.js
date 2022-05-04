import { useNavigate } from "react-router-dom";

const useLogin = (userInputData) => {
  const navigate = useNavigate();

  const userEmailInput = userInputData.userEmailInput;
  const userPWInput = userInputData.userPWInput;

  const userEmail = userInputData.userEmail;
  const userPW = userInputData.userPW;
  const userChkPW = userInputData.userChkPW;

  const req = {
    userEmail,
    userPW,
  };

  const handleSubmit = async () => {
    if (userPW !== userChkPW) {
      userPWInput.current.focus();
      alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
      return;
    }
    if (userEmail.length < 1) {
      userEmailInput.current.focus();
      return;
    }
    if (![userEmail].join().split("").includes("@")) {
      userEmailInput.current.focus();
      alert("Email이 올바르지 않습니다.");
      return;
    }
    if (userPW.length < 1) {
      userPWInput.current.focus();
      return;
    }

    console.log("userData:", userInputData);
    await fetch("/api/user_register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
      });
  };
  return [handleSubmit];
};

export default useLogin;

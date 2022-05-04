import { useNavigate } from "react-router-dom";

const useLogin = (userInputData) => {
  const navigate = useNavigate();

  const userEmail = userInputData.userEmail;
  const userPW = userInputData.userPW;

  const userEmailInput = userInputData.userEmailInput;
  const userPWInput = userInputData.userPWInput;

  const req = {
    userEmail,
    userPW,
  };

  const handleSubmit = async () => {
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

    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        // setNewUserData(data[0]);
        if (data.success) {
          navigate("/", { replace: true });
          return;
        } else {
          alert(data.msg);
          return;
        }
      })
      .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
      });
  };
  return [handleSubmit];
};

export default useLogin;

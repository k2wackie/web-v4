import { useNavigate } from "react-router-dom";

const useLogin = (userInputData) => {
  const navigate = useNavigate();

  const userID = userInputData.userID;
  const userPW = userInputData.userPW;

  const userIDInput = userInputData.userIDInput;
  const userPWInput = userInputData.userPWInput;

  const req = {
    userID,
    userPW,
  };

  const handleSubmit = async () => {
    if (userID.length < 1) {
      userIDInput.current.focus();
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

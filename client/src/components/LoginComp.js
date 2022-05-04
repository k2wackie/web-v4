import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginComp = () => {
  const userEmailInput = useRef();
  const userPWInput = useRef();

  const [userEmail, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const userInputData = {
    userEmail,
    userPW,
    userEmailInput,
    userPWInput,
  };

  const [handleSubmit] = useLogin(userInputData);

  return (
    <div className="loginComp">
      <div className="loginBox">
        <div>로그인</div>
        <div>
          <input
            ref={userEmailInput}
            type="email"
            name="userEmail"
            placeholder="이메일을 입력하세요."
            value={userEmail}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <div>
          <input
            ref={userPWInput}
            type="password"
            name="userPSW"
            placeholder="비밀번호를 입력하세요."
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
          />
        </div>
        <div></div>
        <div>
          <button onClick={handleSubmit}>제 출</button>
        </div>
        <div>
          <p className="registerMSG">
            아이디 / 비밀번호 찾기 /{" "}
            <Link className="registerLink link" to="/register">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginComp);

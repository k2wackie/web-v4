import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";
import { AuthStateContext } from "../hoc/Auth";
import uselogout from "../hooks/useLogout";

const Header = () => {
  const isAuth = useContext(AuthStateContext);
  const navigate = useNavigate();

  const [logoutHandler] = uselogout();

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="Header">
      <Link className="logo link" to="/">
        ACKIE PJT
      </Link>
      <MainMenu />
      {isAuth ? (
        <button className="logout" onClick={logoutHandler}>
          로그아웃
        </button>
      ) : (
        <button className="login" onClick={loginHandler}>
          로그인
        </button>
      )}
    </div>
  );
};

export default React.memo(Header);

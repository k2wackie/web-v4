import Header from "../components/Header";
import LoginComp from "../components/LoginComp";
import "../css/Login.css";

const Login = () => {
  return (
    <div className="loginPage">
      <Header />
      <LoginComp />
    </div>
  );
};

export default Login;

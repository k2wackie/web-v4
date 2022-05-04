import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await fetch("/api/logout")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.logoutSuccess) {
          navigate("/login");
        } else {
          alert("로그아웃을 실패 했습니다.");
        }
      })
      .catch((err) => console.log(err));
  };
  return [logoutHandler];
};

export default useLogout;

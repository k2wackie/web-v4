import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div className="mainMenu">
      <div>
        <Link className="link" to="/bulletin">
          게시판
        </Link>
      </div>
      <div>
        <Link className="link" to="/chat">
          채팅
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;

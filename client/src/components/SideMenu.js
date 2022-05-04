import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="sideMenu">
      <Link className="link" to="/new">
        새 글 생성
      </Link>
    </div>
  );
};

export default SideMenu;

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import BulletinEditor from "../components/BulletinEditor";

const New = () => {
  return (
    <div>
      <Header />
      <div className="contents">
        <SideMenu />
        <div className="bulletin">
          <BulletinEditor isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default New;

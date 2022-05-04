import React from "react";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import BulletinList from "../components/BulletinList";

const Bulletin = () => {
  return (
    <div className="HomePage">
      <Header />
      <div className="contents">
        <SideMenu />
        <div className="bulletin">
          <BulletinList />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Bulletin);

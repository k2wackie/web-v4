import React, { useContext } from "react";
import BulletinItem from "./BulletinItem";
import { BulletinStateContext } from "../App";

const BulletinList = () => {
  const data = useContext(BulletinStateContext);
  return (
    <div className="bulletinList">
      <h2>게시판 리스트</h2>
      <div>
        {data.map((it) => (
          <BulletinItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

BulletinList.defaultProps = {
  data: [],
};

export default React.memo(BulletinList);

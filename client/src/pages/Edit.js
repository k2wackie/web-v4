import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BulletinStateContext } from "../App";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import BulletinEditor from "../components/BulletinEditor";

const Edit = () => {
  const [chosenData, setChosenData] = useState();
  const navigate = useNavigate();
  const id = useParams();
  const bulletinData = useContext(BulletinStateContext);
  useEffect(() => {
    if (bulletinData.length >= 1) {
      const targetBulletin = bulletinData.find(
        (it) => parseInt(it._id) === parseInt(id.id)
      );
      if (targetBulletin) {
        setChosenData(targetBulletin);
      } else {
        alert("없는 게시물입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, bulletinData, navigate]);

  return (
    <div>
      <Header />
      <div className="contents">
        <SideMenu />
        <div className="bulletin">
          {chosenData && (
            <BulletinEditor isEdit={true} chosenData={chosenData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;

import React from "react";
import { useNavigate } from "react-router-dom";

const BulletinItem = ({ id, author, content, in_date }) => {
  const navigate = useNavigate();

  const goEdit = () => {
    navigate(`edit/${id}`);
  };

  const date = new Date(in_date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  // console.log(new Date(in_date).toLocaleString());
  return (
    <div className="bulletinItem" onClick={goEdit}>
      <div>작성자: {author}</div>
      <div>내용: {content}</div>
      <div>
        작성시간: {year}년 {month}월 {day}일 {hours}시 {minutes}분
      </div>
    </div>
  );
};

export default React.memo(BulletinItem);

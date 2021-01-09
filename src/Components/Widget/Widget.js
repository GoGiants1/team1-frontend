import React from "react";
import "./Widget.css";
import InfoIcon from "@material-ui/icons/Info";
import RecordIcon from "@material-ui/icons/FiberManualRecord";

const Widget = () => {
  const newArticle = (heading, subtitle) => (
    <div className="widget__article">
      <div className="widget__articleLeft">
        <RecordIcon />
      </div>
      <div className="widget__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widget">
      <div className="widget__header">
        <h2>오늘 가장 가장 많이 수강된 클래스</h2><InfoIcon />
      </div>
      {newArticle("The Six Morning Habits of High Performers", "Pete Mockaitis")}
      {newArticle("Unconscious Bias", "Stacey Gordon")}
      {newArticle("Critical Thinking for Better Judgment and Decision-Making", "Tatiana Kolovou")}
      {newArticle("Effective Listening", "Tatiana Kolovou")}
      {newArticle("Critical Thinking", "Mike Figliuolo")}
    </div>
  );
};

export default Widget;
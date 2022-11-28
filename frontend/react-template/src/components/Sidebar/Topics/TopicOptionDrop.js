import React from "react";

function TopicOptionDrop({ option }) {
  return (
    <div className={`${option.split(" ").join("")}-option topic-dd`}>
      <div className={`${option.split(" ").join("")}-o-small topic-dd-inside`}>
        {option}
      </div>
    </div>
  );
}

export default TopicOptionDrop;

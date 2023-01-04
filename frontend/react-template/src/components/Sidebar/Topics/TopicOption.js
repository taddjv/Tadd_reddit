import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TopicOptionDrop from "./TopicOptionDrop";

function TopicOption({ title, options, icon }) {
  //! when you click on the title it should do a search for that title
  const [selected, setSelected] = useState(false);
  const [flip, setFlip] = useState(false);

  return (
    <div
      onClick={() => setFlip(!flip)}
      className={`topics-${title.split(" ").join("")}-container`}
    >
      <div
        onClick={() => setSelected(!selected)}
        className={`topics-${title.split(" ").join("")}`}
      >
        <div className={`${title.split(" ").join("")}-left`}>
          <FontAwesomeIcon
            className={`${title.split(" ").join("")}-icon`}
            icon={icon}
          />
          <span className={`${title.split(" ").join("")}-text`}>{title}</span>
        </div>
        <FontAwesomeIcon
          className={`option-down-${title.split(" ").join("")} ${
            flip ? "option-down-flip" : "option-down-normal"
          }`}
          icon={faChevronDown}
        />
      </div>
      {selected && options.map((ele) => <TopicOptionDrop option={ele} />)}
    </div>
  );
}

export default TopicOption;

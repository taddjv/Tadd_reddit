import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TopicOptionDrop from "./TopicOptionDrop";

function TopicOption({ title, options, icon }) {
  //! when you click on the title it should do a search for that title
  const [selected, setSelected] = useState(false);
  const [flip, setFlip] = useState(false);

  return (
    <div className={`topics-ops-container`}>
      <div
        onClick={() => {
          if (icon) {
            setSelected(!selected);
            setFlip(!flip);
          }
        }}
        className={`topics-ops topics-${icon === undefined}`}
      >
        {icon ? (
          <div className={`ops-left`}>
            <FontAwesomeIcon className={`ops-icon`} icon={icon} />
            <span className={`${title.split(" ").join("")}-text`}>{title}</span>
          </div>
        ) : (
          <div className={`ops-left`}>
            <span className={`ops-text`}>{title}</span>
          </div>
        )}
        {options && (
          <FontAwesomeIcon
            className={` ${flip ? "option-down-flip" : "option-down-normal"}`}
            icon={faChevronDown}
          />
        )}
      </div>

      {selected && options.map((ele) => <TopicOptionDrop option={ele} />)}
    </div>
  );
}

export default TopicOption;

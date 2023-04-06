import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const RuleOption = ({ rule, number }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div className="rc-rule-container">
      <div
        onClick={() => {
          setFlip(!flip);
        }}
        className="rc-rule-c-rule"
      >
        <div className="rc-rule-c-r-text">
          {number + "." + " "}
          {rule.rule}
        </div>

        <FontAwesomeIcon
          className={` ${flip ? "option-down-flip" : "option-down-normal"}`}
          icon={faChevronDown}
        />
      </div>
      {flip && <div className="rc-rule-c-desc">{rule.detail}</div>}
    </div>
  );
};

export default RuleOption;

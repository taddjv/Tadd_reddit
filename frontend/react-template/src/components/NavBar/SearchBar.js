import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [showX, stShowX] = useState(false);
  return (
    <>
      <FontAwesomeIcon className="nc-r-s-glass" icon={faMagnifyingGlass} />
      <div className="nc-r-s-input">
        <input placeholder="Search Reddit" />
      </div>

      {showX && <FontAwesomeIcon className="ff" icon={faCircleXmark} />}
    </>
  );
}

export default SearchBar;

import React, { useEffect } from "react";

const ThemeCommunity = ({ community }) => {
  return (
    <>
      <div className="ac-c-o-color">
        <input
          type="text"
          id="ac-c-o-color1"
          placeholder="Main Color (Hex Code)"
          value={null}
          onChange={
            null
            // (e) => setPassword(e.target.value)
          }
        />
        <div className="ac-c-o-c-preview"></div>
      </div>
      <div className="ac-c-o-color">
        <input
          type="text"
          id="ac-c-o-color2"
          placeholder="Secondary Color (Hex Code)"
          value={null}
          onChange={
            null
            // (e) => setPassword(e.target.value)
          }
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className="ac-c-d-ta-s"
      >
        Add Colors
      </button>
    </>
  );
};

export default ThemeCommunity;

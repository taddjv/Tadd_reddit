import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateColor } from "../../helper";
import * as communityActions from "../../store/communities";

const ThemeCommunity = ({ community }) => {
  const dispatch = useDispatch();
  //   const colors = document.querySelector(":root");
  const [color1, setColor1] = useState(community.colors[0]);
  const [color2, setColor2] = useState(community.colors[1]);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  useEffect(() => {
    const colors = document.querySelector(":root");

    if (!validateColor(color1)) {
      setError1(true);
    } else {
      colors.style.setProperty("--tempTheme2", color1);
      setError1(false);
    }
    if (!validateColor(color2)) {
      setError2(true);
    } else {
      colors.style.setProperty("--tempTheme1", color2);
      setError2(false);
    }
  }, [color1, color2]);

  const changeColors = (e) => {
    e.preventDefault();
    const colors = {
      colors: [color1 || community.colors[0], color2 || community.colors[1]],
    };
    if (validateColor(color1) && validateColor(color2)) {
      dispatch(communityActions.patchTheCommunity(community.name, colors));
    }
  };

  return (
    <>
      <div className="ac-c-o-color">
        <input
          type="text"
          id={error1 ? "ac-c-o-color1-error" : "ac-c-o-color1"}
          placeholder="Main Color (Hex Code)"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />
        <div className="ac-c-o-c-preview1"></div>
      </div>
      <div className="ac-c-o-color">
        <input
          type="text"
          id={error2 ? "ac-c-o-color2-error" : "ac-c-o-color2"}
          placeholder="Secondary Color (Hex Code)"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />
        <div className="ac-c-o-c-preview2"></div>
      </div>
      <button onClick={changeColors} className="ac-c-d-ta-s">
        Add Colors
      </button>
    </>
  );
};

export default ThemeCommunity;

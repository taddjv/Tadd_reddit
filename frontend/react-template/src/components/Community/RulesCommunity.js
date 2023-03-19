import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import RuleOption from "./RuleOption";

function RulesCommunity({ community, user }) {
  const dispatch = useDispatch();

  const [showRuleEdit, setShowRuleEdit] = useState(false);
  const [rule, setRule] = useState("");

  const mod = user ? (community.owner === user._id ? user : null) : null;
  const rules = community.rules;

  const addRule = (e) => {
    e.preventDefault();
    const desiredRule = { rule: rule };
    dispatch(
      communitiesActions.patchTheCommunity(community.name, desiredRule)
    ).then(() => {
      setShowRuleEdit(false);
      setRule("");
    });
  };

  return (
    <div className="rules-container">
      <div className="ac-c-top">
        <p className="ac-c-top-left">Rules</p>
      </div>
      {community.rules.map((ele, i) => (
        <RuleOption rule={ele} number={i + 1} />
      ))}
      {showRuleEdit ? (
        <form onSubmit={addRule} className="ar-i-container">
          <input
            type="text"
            id="ar-input"
            value={rule}
            onChange={(e) => {
              setRule(e.target.value);
            }}
            placeholder="Rule"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowRuleEdit(false);
            }}
            className="ac-c-d-ta-c ar-i-c-c"
          >
            Cancel
          </button>
          <button className="ac-c-d-ta-s" type="submit">
            Save
          </button>
        </form>
      ) : (
        <>
          {mod && (
            <div className="rc-add">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowRuleEdit(true);
                }}
                className="ar-a-button"
              >
                Add Rules
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RulesCommunity;

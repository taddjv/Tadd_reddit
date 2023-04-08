import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import RuleOption from "./RuleOption";

function RulesCommunity({ community, user }) {
  const dispatch = useDispatch();

  const [showRuleEdit, setShowRuleEdit] = useState(false);
  const [rule, setRule] = useState("");
  const [details, setDetails] = useState("");
  const [ruleError, setRuleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const mod = user ? (community.owner === user._id ? user : null) : null;

  const addRule = (e) => {
    e.preventDefault();
    if (!rule) setRuleError(true);
    if (!details) setDetailsError(true);

    const desiredRule = { rule: rule, detail: details };
    if (rule && details) {
      dispatch(
        communitiesActions.patchTheCommunity(community.name, desiredRule)
      ).then(() => {
        setShowRuleEdit(false);
        setRule("");
        setDetails("");
      });
    }
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
            className={`ar-input ${ruleError ? "ar-input-e" : null}`}
            value={rule}
            onChange={(e) => {
              setRule(e.target.value);
              setRuleError(false);
            }}
            placeholder="Rule"
          />
          <input
            type="text"
            className={`ar-input ${detailsError ? "ar-input-e" : null}`}
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
              setDetailsError(false);
            }}
            placeholder="Details"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setRule("");
              setDetails("");
              setRuleError(false);
              setDetailsError(false);
              setShowRuleEdit(false);
            }}
            className="ac-c-d-ta-c ar-i-c-c"
          >
            Cancel
          </button>
          <button
            className={`ac-c-d-ta-s ${
              ruleError || detailsError ? "ac-c-d-ta-s-curs" : null
            }`}
            type="submit"
          >
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

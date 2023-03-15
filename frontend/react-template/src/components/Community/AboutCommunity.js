import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";

import "./Community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClipboard } from "@fortawesome/free-regular-svg-icons";

function AboutCommunity({ community, user }) {
  const dispatch = useDispatch();

  const [showDescEdit, setShowDescEdit] = useState(false);
  const [showComOps, setShowComOps] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const mod = user ? (community.owner === user._id ? user : null) : null;
  const description = community.description;
  const comDate = new Date(community.createdAt);

  const addDescription = (e) => {
    e.preventDefault();
    const desiredDescription = { description: newDesc };
    dispatch(
      communitiesActions.patchTheCommunity(community.name, desiredDescription)
    ).then(() => {
      setShowDescEdit(false);
    });
  };

  const comModDescription = description ? (
    <>
      {showDescEdit ? (
        <form onSubmit={addDescription} className="ac-c-d-ta">
          <textarea
            className="ac-c-d-textarea"
            value={newDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
            rows={3}
            cols={5}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowDescEdit(false);
            }}
            className="ac-c-d-ta-c"
          >
            Cancel
          </button>
          <button className="ac-c-d-ta-s" type="submit">
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="ac-c-d-text">{community.description}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowDescEdit(true);
            }}
            className="ac-c-d-button"
          >
            Edit description
          </button>
        </>
      )}
    </>
  ) : (
    <>
      {showDescEdit ? (
        <form onSubmit={addDescription} className="ac-c-d-ta">
          <textarea
            className="ac-c-d-textarea"
            value={newDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
            rows={3}
            cols={5}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowDescEdit(false);
            }}
            className="ac-c-d-ta-c"
          >
            Cancel
          </button>
          <button
            type="submit"
            // onClick={() => {
            //   setShowDescEdit(false);
            // }}
            className="ac-c-d-ta-s"
          >
            Save
          </button>
        </form>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowDescEdit(true);
          }}
          className="ac-c-d-button"
        >
          Add description
        </button>
      )}
    </>
  );

  const comMod = (
    <>
      <div className="AboutCommunity-container">
        <div className="ac-c-top">
          <p className="ac-c-top-left">About community</p>
        </div>
        <div className="ac-c-desc">
          {comModDescription}
          <div className="ac-c-d-bottom">
            <FontAwesomeIcon className="ac-c-d-b-logo" icon={faCalendar} />
            {comDate && (
              <p className="ac-c-d-b-text">
                Created {comDate.toString().slice(0, 16)}
              </p>
            )}
          </div>
        </div>
        <div className="ac-c-stats">
          <div className="ac-c-s-members">
            <div className="ac-c-s-m-number">44</div>
            <div className="ac-c-s-m-text">Members</div>
          </div>
          <div className="ac-c-s-rank">
            <div className="ac-c-s-r-number">2nd</div>
            <div className="ac-c-s-r-text">Ranked by Size</div>
          </div>
        </div>
        <div className="ac-c-post">
          <button className="ac-c-p-button">Create Post</button>
        </div>
        <div className="ac-c-options">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowComOps(!showComOps);
            }}
            className="ac-c-o-button"
          >
            Community options
          </button>
          {showComOps && (
            <>
              <div className="ac-c-o-color1">
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
              </div>
              <div className="ac-c-o-color2">
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
                  setShowComOps(false);
                }}
                className="ac-c-d-ta-s"
              >
                Add Colors
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
  const comUser = (
    <>
      <div className="AboutCommunity-container">
        <div className="ac-c-top">
          <p className="ac-c-top-left">About community</p>
        </div>
        <div className="ac-c-desc">
          {description && (
            <div className="ac-c-d-text">{community.description}</div>
          )}
          <div className="ac-c-d-bottom">
            <FontAwesomeIcon className="ac-c-d-b-logo" icon={faCalendar} />
            <p className="ac-c-d-b-text">
              Created {comDate.toString().slice(0, 16)}
            </p>
          </div>
        </div>
        <div className="ac-c-stats">
          <div className="ac-c-s-members">
            <div className="ac-c-s-m-number">44</div>
            <div className="ac-c-s-m-text">Members</div>
          </div>
          <div className="ac-c-s-rank">
            <div className="ac-c-s-r-number">2nd</div>
            <div className="ac-c-s-r-text">Ranked by Size</div>
          </div>
        </div>
        <div className="ac-c-post">
          <button className="ac-c-p-button">Create Post</button>
        </div>
      </div>
    </>
  );
  const comNonUser = (
    <>
      <div className="AboutCommunity-container">
        <div className="ac-c-top">
          <p className="ac-c-top-left">About community</p>
        </div>
        <div className="ac-c-desc">
          {description && (
            <div className="ac-c-d-text">{community.description}</div>
          )}
          <div className="ac-c-d-bottom">
            <FontAwesomeIcon className="ac-c-d-b-logo" icon={faCalendar} />
            <p className="ac-c-d-b-text">
              Created {comDate.toString().slice(0, 16)}
            </p>
          </div>
        </div>
        <div className="ac-c-stats">
          <div className="ac-c-s-members">
            <div className="ac-c-s-m-number">44</div>
            <div className="ac-c-s-m-text">Members</div>
          </div>
          <div className="ac-c-s-rank">
            <div className="ac-c-s-r-number">2nd</div>
            <div className="ac-c-s-r-text">Ranked by Size</div>
          </div>
        </div>
      </div>
    </>
  );
  return <>{mod ? comMod : user ? comUser : comNonUser}</>;
}

export default AboutCommunity;

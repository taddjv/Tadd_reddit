import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import * as subscriptionsActions from "../../store/subscriptions";
import * as userActions from "../../store/users";
import { userSubbed, dataRender, setComColor } from "../../helper";
import { usePop } from "../../context/UserPopcontext";

import Posts from "../Feed/Posts";
import AboutCommunity from "./AboutCommunity";
import RulesCommunity from "./RulesCommunity";

import "./Community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import AddPhotoFrom from "../User/AddPhotoFrom";

function Community() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityName } = params;
  const community = useSelector((state) => state.communities.community);
  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);
  const subscriptionStatus = useSelector((state) => state.subscriptions);
  const { setDropUser, setShowLogin } = usePop();

  const [communityId, setCommunityId] = useState(null);
  const [isMod, setIsMod] = useState(false);

  const [showPosts, setShowPosts] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [subcount, setSubCount] = useState(null);

  useEffect(() => {
    if (community?.colors) {
      setComColor(community.colors[0], community.colors[1]);
    }
  }, [community]);

  useEffect(() => {
    dispatch(communitiesActions.getTheCommunity(communityName)).then(
      async (res) => {
        const data = await res;
        setCommunityId(data._id);
      }
    );
    return () => {
      setCommunityId(null);
    };
  }, [history.location.pathname]);

  useEffect(() => {
    if (currentUser && community) {
      dispatch(
        userActions.addTheRecent(currentUser._id, {
          profilePicture: community.profilePicture,
          name: community.name,
        })
      );
      if (currentUser._id === community.owner) {
        setIsMod(true);
      }
    }
  }, [community, history.location.pathname]);

  const subscribe = (e) => {
    e.preventDefault();
    dispatch(
      subscriptionsActions.postTheSubscription(community._id, {
        role: "member",
      })
    );
  };
  const unsubscribe = (e) => {
    e.preventDefault();
    dispatch(subscriptionsActions.deleteTheSubscription(community._id));
  };
  return (
    <>
      {community && (
        <>
          <div className="community">
            <div className="community-header">
              <div className="c-h-1"></div>
              <div className="c-h-2">
                <div className="c-h-2-content">
                  <div className="c-h-2-profile-container">
                    {!community?.profilePicture ? (
                      <div className="c-h-2-profile c-h-2-profile-default">
                        <FontAwesomeIcon
                          className="c-h-2-p-d-child"
                          icon={faClipboardList}
                        />
                      </div>
                    ) : (
                      <img
                        src={community.profilePicture}
                        className="c-h-2-profile"
                      />
                    )}
                    {currentUser?._id === community?.owner && (
                      <AddPhotoFrom
                        container="userr"
                        drop="user-drop"
                        img="user-img"
                        type="community"
                        community={community}
                      />
                    )}
                  </div>

                  <div className="c-h-2-name">
                    <div className="c-h-2-n-bold">{community.name}</div>
                    <div className="c-h-2-n-simple">r/{community.name}</div>
                  </div>
                  {userSubbed(subscriptionStatus, community._id) ? (
                    <button onClick={unsubscribe} className="c-h-2-button">
                      Joined
                    </button>
                  ) : (
                    <button onClick={subscribe} className="c-h-2-button">
                      Join
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="community-body">
              <div className="c-b-left">
                <div
                  onClick={
                    currentUser
                      ? () => history.push(`/r/${community.name}/submit`)
                      : () => {
                          setShowLogin(true);
                        }
                  }
                  className="c-b-post"
                >
                  {currentUser?.profilePicture ? (
                    <img
                      className="c-b-p-profile"
                      src={currentUser.profilePicture}
                    />
                  ) : (
                    <FontAwesomeIcon className="c-b-p-profile" icon={faUser} />
                  )}

                  <input
                    type="text"
                    id="c-b-p-input"
                    placeholder="Create a post"
                  />
                  <FontAwesomeIcon className="c-b-p-post" icon={faPaperPlane} />
                </div>
                {communityId && (
                  <Posts type="community" community={community} />
                )}
              </div>
              <div className="c-b-right">
                <AboutCommunity community={community} user={currentUser} />
                <RulesCommunity community={community} user={currentUser} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Community;

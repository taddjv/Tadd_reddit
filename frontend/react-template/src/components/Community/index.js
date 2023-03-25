import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import * as subscriptionsActions from "../../store/subscriptions";
import * as postsActions from "../../store/posts";
import * as userActions from "../../store/users";
import { userSubbed, dataRender } from "../../helper";

import Posts from "../Feed/Posts";
import PhotoPost from "../Feed/Posts/PhotoPost";
import VideoPost from "../Feed/Posts/VideoPost";
import LinkPost from "../Feed/Posts/LinkPost";
import TextPost from "../Feed/Posts/TextPost";
import AboutCommunity from "./AboutCommunity";
import RulesCommunity from "./RulesCommunity";

import "./Community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHandPointUp,
  faStar,
  faChartBar,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

function Community() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityName } = params;
  const community = useSelector((state) => state.communities.community);
  const posts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);
  const subscriptionStatus = useSelector((state) => state.subscriptions);

  const [showPictureEdit, setShowPictureEdit] = useState(false);

  const [communityId, setCommunityId] = useState(null);
  const [isMod, setIsMod] = useState(false);

  const [showPosts, setShowPosts] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [subcount, setSubCount] = useState(null);

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
                      <form
                        // onSubmit={uploadImage}
                        className="c-h-2-plus-container"
                      >
                        <FontAwesomeIcon
                          onClick={() => setShowPictureEdit(!showPictureEdit)}
                          className="c-h-2-plus"
                          icon={faPlusSquare}
                        />
                        {showPictureEdit && (
                          <div className="c-h-2-plus-dd">
                            <input
                              type="file"
                              id="c-profile-input"
                              accept="image/*"
                              // onChange={imageToFile}
                              // value={comImage}
                            />
                            <label
                              for="c-profile-input"
                              className="c-profile-input"
                            >
                              Add an Image
                            </label>
                            <input
                              type="text"
                              placeholder="Or Paste Image Url Here"
                              onChange={(e) => {
                                // setComImage2(e.target.value);
                              }}
                            />
                            <div className="c-h-2-plus-dd-buttons">
                              <button onClick={() => setShowPictureEdit(false)}>
                                cancel
                              </button>
                              <button
                              // onClick={uploadImage}
                              >
                                save
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
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
                  onClick={() => history.push(`/r/${community.name}/submit`)}
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
                  <Posts type="community" communityId={communityId} />
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

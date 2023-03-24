import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import * as subscriptionsActions from "../../store/subscriptions";
import * as postsActions from "../../store/posts";
import * as userActions from "../../store/users";
import { userSubbed, dataRender } from "../../helper";

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
  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    dispatch(communitiesActions.getTheCommunity(communityName));
  }, [history.location.pathname]);

  useEffect(() => {
    if (community) {
      dispatch(postsActions.getTheCommunityPosts(community._id));
      dispatch(subscriptionsActions.getTheUsersS(community._id)).then(
        async (res) => {
          const data = await res;
          console.log(data);
        }
      );
    }
    if (currentUser && community) {
      dispatch(
        userActions.addTheRecent(currentUser._id, {
          profilePicture: community.profilePicture,
          name: community.name,
        })
      );
    }
  }, [community]);

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
                    <div className="c-h-2-profile c-h-2-profile-default">
                      <FontAwesomeIcon
                        className="c-h-2-p-d-child"
                        icon={faClipboardList}
                      />
                    </div>

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
                  <img
                    className="c-b-p-profile"
                    src="https://img.freepik.com/premium-vector/pretty-hijab-woman-side-profile-with-colorful-flower-bouquet_185694-1105.jpg?w=2000"
                  />
                  <input
                    type="text"
                    id="c-b-p-input"
                    placeholder="Create a post"
                  />
                  <FontAwesomeIcon className="c-b-p-post" icon={faPaperPlane} />
                </div>
                <div className="posts-sorter">
                  <button className="p-s-hot p-s-option">
                    <FontAwesomeIcon
                      className="f-h-house"
                      icon={faHandPointUp}
                    />
                    Hot
                  </button>

                  <button className="p-s-new p-s-option">
                    <FontAwesomeIcon
                      className="f-h-house ps-o-new-logo"
                      icon={faStar}
                    />
                    New
                  </button>
                  <button className="p-s-top p-s-option">
                    <FontAwesomeIcon
                      className="f-h-house ps-o-top-logo"
                      icon={faChartBar}
                    />
                    Top
                  </button>
                </div>
                {posts &&
                  dataRender(posts).map((ele) => {
                    switch (ele.type) {
                      case "text":
                        return (
                          <TextPost
                            post={ele}
                            user={currentUser}
                            userVotes={userVotes}
                            community={true}
                          />
                        );
                      case "link":
                        return (
                          <LinkPost
                            post={ele}
                            user={currentUser}
                            userVotes={userVotes}
                            community={true}
                          />
                        );
                      case "image":
                        return (
                          <PhotoPost
                            post={ele}
                            user={currentUser}
                            userVotes={userVotes}
                            community={true}
                          />
                        );
                      case "video":
                        return (
                          <VideoPost
                            post={ele}
                            user={currentUser}
                            userVotes={userVotes}
                            community={true}
                          />
                        );
                    }
                  })}
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

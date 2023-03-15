import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import * as subscriptionsActions from "../../store/subscriptions";
import * as imagesActions from "../../store/images";
import { userSubbed } from "../../helper";

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

  const { communityName } = params;
  const community = useSelector((state) => state.communities.community);
  const currentUser = useSelector((state) => state.users.user);
  const subscriptionStatus = useSelector((state) => state.subscriptions);
  const [showPictureEdit, setShowPictureEdit] = useState(false);
  const [comImage, setComImage] = useState(null);
  const [comImage2, setComImage2] = useState(null);

  useEffect(() => {
    dispatch(communitiesActions.getTheCommunity(communityName));
  }, []);

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

  // const uploadImage = (e) => {
  //   e.preventDefault();

  //   dispatch(imagesActions.postTheImage(comImage)).then(async (res) => {
  //     const data = await res;
  //     console.log(data);
  //   });

  //   // const
  // };

  // const imageToFile = (e) => {
  //   const formData = new FormData();
  //   formData.append("image", e.target.files[(0, e.target.files[0].name)]);
  //   setComImage(formData);
  // };
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
                <div className="c-b-post">
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
                <PhotoPost />
                <VideoPost />
                <LinkPost title="Murdering with kindness" />
                <LinkPost
                  title="Self diagnoses of diverse conditions including anxiety, depression, eating disorders, autism, and gender identity-related conditions has been linked to social media platforms.
Psychology"
                />
                <TextPost
                  title="AITA for putting parental controls on my TV and royally pissing off my FIL?"
                  content={`I (M30's) live with my wife (F30's). We have two kids, M8 and F6.

    My wife's parents are staying with us temporarily as their home is having some serious repairs after a freak accident. It wasn't their fault and luckily they had insurance. The repairs should be completed in two months from now.

    I don't really get along with my in-laws, especially my father-in-law, but I agreed to let them stay because I thought the time would fly by and it wouldn't be that bad, but I'm posting here so I guess I was wrong.

    My MIL doesn't have a job and my FIL works late shifts until around 11pm. When he gets home they will watch YouTube in the living room and play music on it at a loud volume with our speaker system, it's not "college house party bass tearing apart the walls" loud but it is still loud.

    My kids are not light sleepers but this wakes them up, then they go wake me up because they want me to make it stop. My kids need to be rested for school and I need to get up in the morning to drop them off and go to work.

    My wife works overnight shifts so she doesn't witness this.

    I've tried to talk to my MIL and FIL about it and asked that they please keep the noise down after my kids' bed time which is 8:30pm. I don't expect complete silence but I really don't think they need to have the TV on loud late at night.

    My FIL argued with me and said that he doesn't finish work til 11pm, so I'm basically expecting him to not do the things he enjoys after work. I told him he can do it before work or on his days off or it's tough shit.

    He complained to my wife who's now taking his side and saying that the kids need to learn how to sleep through "a bit of everyday noise".

    I told her it's not everyday noise and that he and MIL are being excessively noisy and inconsiderate, she's just not there to see it. My FIL has been sending me links to buy earplugs for the kids.

    I've gotten really fed up with this. It's not my in-laws' house and they're staying with us as guests and I think they're being really selfish.

    I decided to put parental controls on the TV so that my in-laws can't use it after 8:30pm, until 6am the next day. Between those times the TV can't be used without putting in the password and only I know it. This doesn't affect my wife as she doesn't get off work until 6am and isn't normally home until 6:20ish.

    My FIL is now incredibly pissed off with me and said that I'm acting like a child and keeps pestering me, demanding the password. My wife is also mad at me for upsetting her dad.

    I'm just so annoyed at this whole situation and I'm sick of hearing about it so I just want to know if I'm morally in the clear.`}
                />
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

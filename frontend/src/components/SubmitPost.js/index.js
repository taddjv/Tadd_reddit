import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as communitiesActions from "../../store/communities";
import * as postsActions from "../../store/posts";
import TextSubmit from "./TextSubmit";
import ImageSubmit from "./ImageSubmit";
import VideoSubmit from "./VideoSubmit";
import LinkSubmit from "./LinkSubmit";
import { usePop } from "../../context/UserPopcontext";

import AboutCommunity from "../Community/AboutCommunity";
import RulesCommunity from "../Community/RulesCommunity";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faImage,
  faLink,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./SubmitPost.css";

const SubmitPost = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { setDropUser } = usePop();

  const { communityName } = params;
  const community = useSelector((state) => state.communities.community);
  const currentUser = useSelector((state) => state.users.user);

  const [textSelected, setTextSelected] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [linkSelected, setLinkSelected] = useState(false);

  useEffect(() => {
    dispatch(communitiesActions.getTheCommunity(communityName)).then(
      async (res) => {
        const data = await res;
        dispatch(postsActions.getTheCommunityPosts(data._id));
        if (data.contentType.includes("text")) {
          setTextSelected(true);
        } else if (data.contentType.includes("image")) {
          setImageSelected(true);
        } else if (data.contentType.includes("video")) {
          setVideoSelected(true);
        } else if (data.contentType.includes("link")) {
          setLinkSelected(true);
        }
      }
    );
  }, []);

  return (
    <>
      {community && (
        <div className="submitPost-Container">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDropUser(false);
            }}
            className="submitPost"
          >
            <div className="submitPost-left">
              <div className="suP-l-title">Create a Post</div>
              <div className="suP-l-content">
                <div className="suP-l-c-selector">
                  <button
                    onClick={() => {
                      setTextSelected(true);
                      setImageSelected(false);
                      setVideoSelected(false);
                      setLinkSelected(false);
                    }}
                    disabled={
                      community.contentType.split(",").includes("text")
                        ? false
                        : true
                    }
                    className={`suP-l-c-s-choice ${
                      textSelected && "suP-l-c-s-choice-selected"
                    }`}
                  >
                    <div>
                      <FontAwesomeIcon
                        className="suP-l-c-s-c-logo"
                        icon={faFileText}
                      />
                      Post
                    </div>
                  </button>
                  <button
                    disabled={
                      community.contentType.split(",").includes("image")
                        ? false
                        : true
                    }
                    onClick={() => {
                      setTextSelected(false);
                      setImageSelected(true);
                      setVideoSelected(false);
                      setLinkSelected(false);
                    }}
                    className={`suP-l-c-s-choice ${
                      imageSelected && "suP-l-c-s-choice-selected"
                    }`}
                  >
                    <div>
                      <FontAwesomeIcon
                        className="suP-l-c-s-c-logo"
                        icon={faImage}
                      />
                      Photo
                    </div>
                  </button>
                  <button
                    disabled={
                      community.contentType.split(",").includes("video")
                        ? false
                        : true
                    }
                    onClick={() => {
                      setTextSelected(false);
                      setImageSelected(false);
                      setVideoSelected(true);
                      setLinkSelected(false);
                    }}
                    className={`suP-l-c-s-choice ${
                      videoSelected && "suP-l-c-s-choice-selected"
                    }`}
                  >
                    <div>
                      <FontAwesomeIcon
                        className="suP-l-c-s-c-logo"
                        icon={faVideo}
                      />
                      Video
                    </div>
                  </button>
                  <button
                    disabled={
                      community.contentType.split(",").includes("link")
                        ? false
                        : true
                    }
                    onClick={() => {
                      setTextSelected(false);
                      setImageSelected(false);
                      setVideoSelected(false);
                      setLinkSelected(true);
                    }}
                    className={`suP-l-c-s-choice ${
                      linkSelected && "suP-l-c-s-choice-selected"
                    }`}
                  >
                    <div>
                      <FontAwesomeIcon
                        className="suP-l-c-s-c-logo"
                        icon={faLink}
                      />
                      Link
                    </div>
                  </button>
                </div>
                <div className="suP-l-c-input">
                  {textSelected && <TextSubmit community={community} />}
                  {imageSelected && <ImageSubmit community={community} />}
                  {videoSelected && <VideoSubmit community={community} />}
                  {linkSelected && <LinkSubmit community={community} />}
                </div>
              </div>
            </div>

            <div className="submitPost-right">
              <AboutCommunity community={community} user={currentUser} />
              <RulesCommunity community={community} user={currentUser} />
              <button
                className="suP-button"
                onClick={(e) => {
                  e.preventDefault();
                  history.goBack();
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitPost;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../store/posts";
import { dataRender } from "../../../helper";
import PhotoPost from "./PhotoPost";
import VideoPost from "./VideoPost";
import LinkPost from "./LinkPost";
import TextPost from "./TextPost";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsis,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentAlt,
  faFolder,
  faHandPointUp,
  faStar,
  faChartBar,
} from "@fortawesome/free-regular-svg-icons";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(postsActions.getThePosts());
  }, []);

  return (
    <div className="posts">
      <div className="posts-title">Popular posts</div>
      <div className="posts-sorter">
        <button className="p-s-hot p-s-option">
          <FontAwesomeIcon className="f-h-house" icon={faHandPointUp} />
          Hot
        </button>

        <button className="p-s-new p-s-option">
          <FontAwesomeIcon className="f-h-house ps-o-new-logo" icon={faStar} />
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
              return <TextPost post={ele} user={currentUser} />;
          }
        })}
      {/* <PhotoPost />
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
      /> */}
    </div>
  );
}

export default Posts;

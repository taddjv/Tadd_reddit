import * as postActions from "../store/posts";
import * as voteActions from "../store/votes";
import * as subscriptionsActions from "../store/subscriptions";
import * as userActions from "../store/users";
import * as redditorActions from "../store/redditors";

export const upvotePost = (post, user, dispatch) => {
  const upvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.upvoteThePost(post, user)).then(async (res) => {
      const data = await res;
      dispatch(postActions.upvoteThePost(post._id, data));
    });
  };
  return upvote;
};

export const downvotePost = (post, user, dispatch) => {
  const downvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.downvoteThePost(post, user)).then(async (res) => {
      const data = await res;
      dispatch(postActions.downvoteThePost(post._id, data));
    });
  };
  return downvote;
};

export const subscribeViaPost = (post, dispatch) => {
  const subscribe = (e) => {
    e.preventDefault();
    dispatch(
      subscriptionsActions.postTheSubscription(post.community._id, {
        role: "member",
      })
    );
  };
  return subscribe;
};

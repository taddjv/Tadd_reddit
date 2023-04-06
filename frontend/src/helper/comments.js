import * as postActions from "../store/posts";
import * as voteActions from "../store/votes";
import * as commentActions from "../store/comments";
import * as subscriptionsActions from "../store/subscriptions";
import * as userActions from "../store/users";
import * as redditorActions from "../store/redditors";

export const upvoteComment = (comment, currentUser, dispatch) => {
  const upvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.upvoteTheComment(comment, currentUser)).then(
      async (res) => {
        const data = await res;
        dispatch(commentActions.upvoteTheComment(comment._id, data));
      }
    );
  };
  return upvote;
};
export const downvoteComment = (comment, currentUser, dispatch) => {
  const downvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.downvoteTheComment(comment, currentUser)).then(
      async (res) => {
        const data = await res;
        dispatch(commentActions.downvoteTheComment(comment._id, data));
      }
    );
  };
  return downvote;
};

export const remove = (comment, dispatch) => {
  return (e) => {
    e.preventDefault();
    dispatch(commentActions.deleteTheComment(comment._id)).then(async (res) => {
      const data = await res;
      dispatch(postActions.getTheSinglePost(data.post));
    });
  };
};

export const comment = (comment, post, dispatch, func) => {
  return (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        commentActions.postTheComment({ content: comment, type: "main" }, post)
      ).then(async (res) => {
        func("");
        const data = await res;
        dispatch(postActions.getTheSinglePost(data.post));
      });
    }
  };
};

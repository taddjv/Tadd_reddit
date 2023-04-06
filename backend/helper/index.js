exports.callErr = (message, code, next) => {
  const err = Error("Validation Error");
  err.errors = [message];
  err.status = code || 400;
  err.title = "Validation Error";
  return next(err);
};

exports.checkPassword = (oldP, newP) => {};

exports.checkSearch = (search) => {
  if (search) {
    return {
      content: new RegExp(`(${search})`, "i"),
    };
  } else {
    return {};
  }
};

exports.sortQuery = (sort) => {
  if (["Hot", "Best"].includes(sort)) {
    return { upVotes: -1, downVotes: 1 };
  } else if (["New", "Newest"].includes(sort)) {
    return { createdAt: -1 };
  }
};

exports.votePost = (status, type1, type2) => {
  const final = {
    up: 0,
    down: 0,
  };
  if (status?.removed) {
    final[type1]--;
  } else if (status?.edited) {
    final[type1]++;
    final[type2]--;
  } else if (status.statusCode >= 400) {
    return status;
  } else {
    final[type1]++;
  }
  return final;
};

exports.editPostVote = (status, type1, type2) => {
  if (status?.removed) {
    post[`${type1}Votes`]--;
  } else if (status?.edited) {
    post[`${type2}Votes`]--;
    post[`${type1}Votes`]++;
  } else {
    post[`${type1}Votes`]++;
  }
};

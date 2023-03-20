export const formSetter = (state) => {
  const form1 = document.getElementsByClassName("lc-container1")[0];
  const form2 = document.getElementsByClassName("lc-container2")[0];

  if (state === true) {
    form1.style.display = "block";
    form2.style.display = "none";
  } else {
    form2.style.display = "block";
    form1.style.display = "none";
  }
};

export const userSubbed = (subs, commId) => {
  for (let subscription in subs) {
    if (subs[subscription].community === commId) {
      return true;
    }
  }
  return false;
};

export const dataRender = (obj) => {
  const final = [];
  for (let data in obj) {
    if (data !== "data") {
      final.push(obj[data]);
    }
  }
  return final;
};

export const reactionCheck = (userData, post) => {
  let final = {};
  for (let vote in userData) {
    if (userData[vote].post === post._id) {
      final["upvote"] = userData[vote].upvote;
      final["downvote"] = userData[vote].downvote;
    }
  }
  return final;
};

export const searchRender = (obj, type) => {
  const final = [];
  for (let data in obj) {
    if (data !== "data" && data.split("/")[0] === type) {
      final.push(obj[data]);
    }
  }
  return final;
};

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
    if (
      userData[vote]["post"] === post._id ||
      userData[vote]["comment"] === post._id
    ) {
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

export const validateUsername = (oldU, newU, user) => {};

export const validateColor = (color) => {
  const code = "01234567890abcdef";
  const newColor = color.slice(1);

  if (newColor.length > 6 || newColor.length < 3 || newColor.length === 5) {
    return false;
  }

  for (let i = 0; i < newColor.length; i++) {
    let number = newColor[i].toString();
    if (!code.toLocaleLowerCase().includes(number.toLocaleLowerCase())) {
      return false;
    }
  }
  return true;
};

export const setPostColor = (color) => {
  const colors = document.querySelector(":root");
  colors.style.setProperty("--postColor", color);
};
export const setComColor = (color1, color2) => {
  const colors = document.querySelector(":root");
  colors.style.setProperty("--comTheme1", color1 || "#33a8ff");
  colors.style.setProperty("--comTheme2", color2 || "#0079d3");
};

export const isOwner = (thing, user) => {
  return thing.author._id === user?._id;
};

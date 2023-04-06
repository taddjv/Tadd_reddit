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
    if (data !== "data" && data !== "community") {
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
  colors.style.setProperty("--accentColor", color);
};
export const setComColor = (color1, color2) => {
  const colors = document.querySelector(":root");
  colors.style.setProperty("--comTheme1", color1 || "#33a8ff");
  colors.style.setProperty("--comTheme2", color2 || "#0079d3");
};

export const isOwner = (thing, user) => {
  return thing.author._id === user?._id;
};

export const checkMode = () => {
  const mode = localStorage.getItem("mode");
  if (mode === "light") {
    setLight();
    return "light";
  } else if (mode === "dark") {
    setDark();
    return "dark";
  } else {
    localStorage.setItem("mode", "light");
  }
};

export const setLight = () => {
  localStorage.setItem("mode", "light");
  const colors = document.querySelector(":root");
  colors.style.setProperty("--mainColor", "rgba(255, 255, 255, 1)");
  colors.style.setProperty("--greyColor1", "rgba(246,247,248,1)");
  colors.style.setProperty("--greyColor2", "rgba(237, 237, 237, 1)");
  colors.style.setProperty("--greyColor3", "rgba(236,239,241,1)");
  colors.style.setProperty("--greyColor4", "rgba(204,204,204,1)");
  colors.style.setProperty("--greyColor5", "rgba(137,137,137,1)");
  colors.style.setProperty("--greyColor6", "rgba(245, 245, 245, 1)");
  colors.style.setProperty("--greyColor7", "rgba(248, 249, 250, 1)");
  colors.style.setProperty("--backColor", "rgba(218, 224, 230, 1)");
  colors.style.setProperty("--accentColor", "rgba(40, 132, 214, 1)");
  colors.style.setProperty("--mainFontColor", "rgba(28,28,28,1)");
};
export const setDark = () => {
  localStorage.setItem("mode", "dark");
  const colors = document.querySelector(":root");
  colors.style.setProperty("--mainColor", "rgba(26, 26, 27, 1)");
  colors.style.setProperty("--greyColor1", "rgba(39,39,41,1)");
  colors.style.setProperty("--greyColor2", "rgba(53,53,55,1)");
  colors.style.setProperty("--greyColor3", "rgba(52,53,54,1)");
  colors.style.setProperty("--greyColor4", "rgba(52,53,54,1)");
  colors.style.setProperty("--greyColor5", "rgba(128,131,132,1)");
  colors.style.setProperty("--greyColor6", "rgba(35,35,36,1)");
  colors.style.setProperty("--greyColor7", "rgba(22,22,23,1)");
  colors.style.setProperty("--backColor", "rgba(3,3,3,1)");
  colors.style.setProperty("--accentColor", "rgba(215,218,220,1)");
  colors.style.setProperty("--mainFontColor", "rgba(215,218,220,1)");
};

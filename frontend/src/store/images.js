import { url, token } from "../helper";

const POST_IMAGE = "images/POST_IMAGE";

const postImage = (image) => {
  return {
    type: POST_IMAGE,
    payload: image,
  };
};

export const postTheImage = (image) => async (dispatch) => {
  const response = await fetch(`https://greenit-api.onrender.com/api/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(postImage(data));
  }
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE: {
      const newState = Object.assign({}, state);
      return newState;
    }
    default:
      return state;
  }
};

export default imagesReducer;

import { csrfFetch } from "./csrf";

const GET_REDDITOR = "redditors/GET_REDDITOR";
const EDIT_REDDITOR = "redditors/EDIT_REDDITOR";

const getRedditor = (user) => {
  return {
    type: GET_REDDITOR,
    payload: user,
  };
};
const editRedditor = (user) => {
  return {
    type: EDIT_REDDITOR,
    payload: user,
  };
};

export const getTheRedditor = (user) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.com/api/users/${user}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getRedditor(data));
    return data;
  }
};
export const editTheRedditor =
  (userCredentials, userId) => async (dispatch) => {
    const response = await csrfFetch(
      `https://greenit-api.onrender.com/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(editRedditor(data));
    }
    return data;
  };

const initialState = {};
const redditorsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REDDITOR: {
      newState = {};
      newState = action.payload;

      return newState;
    }
    case EDIT_REDDITOR: {
      newState = {};
      newState = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default redditorsReducer;

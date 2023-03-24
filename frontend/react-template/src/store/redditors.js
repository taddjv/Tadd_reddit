import { csrfFetch } from "./csrf";

const GET_REDDITOR = "redditors/GET_REDDITOR";

const getRedditor = (user) => {
  return {
    type: GET_REDDITOR,
    payload: user,
  };
};

export const getTheRedditor = (user) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${user}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getRedditor(data));
    return data;
  }
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

    default:
      return state;
  }
};

export default redditorsReducer;

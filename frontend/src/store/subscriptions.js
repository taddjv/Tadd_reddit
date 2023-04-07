import { csrfFetch } from "./csrf";

const GET_USERS_S = "subscriptions/GET_USERS_S";
const GET_COMMUNITIES_S = "subscriptions/GET_COMMUNITIES_S";
const POST_SUBSCRIPTION = "subscriptions/POST_SUBSCRIPTION";
const DELETE_SUBSCRIPTION = "subscriptions/DELETE_SUBSCRIPTION";

const getUsersS = (users) => {
  return {
    type: GET_USERS_S,
    payload: users,
  };
};
const getCommunitiesS = (communities) => {
  return {
    type: GET_COMMUNITIES_S,
    payload: communities,
  };
};
const postSubscription = (community) => {
  return {
    type: POST_SUBSCRIPTION,
    payload: community,
  };
};
const deleteSubscription = (id) => {
  return {
    type: DELETE_SUBSCRIPTION,
    payload: id,
  };
};

export const getTheUsersS = (communityId) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.comhttps://greenit-api.onrender.com/api/suscriptions/community/${communityId}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getUsersS(data));
    return data;
  }
};
export const getTheCommunitiesS = (userId) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.comhttps://greenit-api.onrender.com/api/suscriptions/user/${userId}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommunitiesS(data));
  }
};
export const postTheSubscription = (communityId, role) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.comhttps://greenit-api.onrender.com/api/suscriptions/community/${communityId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(role),
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(postSubscription(data));
  }
};
export const deleteTheSubscription = (communityId) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.comhttps://greenit-api.onrender.com/api/suscriptions/community/${communityId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSubscription(data));
  }
};
const initialState = {};
const subscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMUNITIES_S: {
      let newState = {};
      if (action.payload.message) {
        return newState;
      } else {
        action.payload.forEach((ele, i) => {
          newState[ele._id] = ele;
        });
        return newState;
      }
    }
    case GET_USERS_S: {
      let newState = { ...state };
      return newState;
    }
    case POST_SUBSCRIPTION: {
      let newState = { ...state };

      newState[action.payload._id] = action.payload;
      return newState;
    }
    case DELETE_SUBSCRIPTION: {
      let newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default subscriptionsReducer;

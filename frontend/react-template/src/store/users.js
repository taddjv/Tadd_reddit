import { csrfFetch } from "./csrf";

const SIGNUP_USER = "users/SIGNUP_USER";
const LOGIN_USER = "users/LOGIN_USER";
const LOGOUT_USER = "users/LOGOUT_USER";
const RESTORE_USER = "users/RESTORE_USER";

const signupUser = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user,
  };
};
const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};
const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
const restoreUser = (user) => {
  return {
    type: RESTORE_USER,
    payload: user,
  };
};

export const signupTheUser = (userCredentials) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(signupUser(data));
  }
};
export const loginTheUser = (userCredentials) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(loginUser(data));
  }
};
export const logoutTheUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/logout`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(logoutUser());
  }
};
export const restoreTheUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/restore`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(restoreUser(data));
  }
};

const initialState = { user: null };
const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SIGNUP_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case LOGIN_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case LOGOUT_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case RESTORE_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload.message ? null : action.payload;
      return newState;

    default:
      return state;
  }
};

export default usersReducer;

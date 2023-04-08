import { url, token } from "../helper";

const cookie = document.cookie.split(";")[0].slice(6);

const SIGNUP_USER = "users/SIGNUP_USER";
const LOGIN_USER = "users/LOGIN_USER";
const LOGOUT_USER = "users/LOGOUT_USER";
const RESTORE_USER = "users/RESTORE_USER";
const ADD_RECENT = "users/ADD_RECENT";
const UPDATE_USER = "users/UPDATE_USER";

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
const addRecent = (community) => {
  return {
    type: ADD_RECENT,
    payload: community,
  };
};
const editUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const signupTheUser = (userCredentials) => async (dispatch) => {
  const response = await fetch(`${url}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(signupUser(data));
  } else {
    return data;
  }
};
export const loginTheUser = (userCredentials) => async (dispatch) => {
  const response = await fetch(`${url}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  const data = await response.json();
  if (response.ok) {
    document.cookie = `token=${data.token}`;
    dispatch(loginUser(data.user));
  } else {
    return data;
  }
};
export const logoutTheUser = () => async (dispatch) => {
  const response = await fetch(`${url}/api/users/logout`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(logoutUser());
  }
};
export const restoreTheUser = () => async (dispatch) => {
  const cookie = document.cookie.split(";")[0].slice(6);
  const response = await fetch(`${url}/api/users/restore`, {
    method: "GET",
    headers: {
      Authentication: cookie,
    },
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(restoreUser(data));
    return data;
  } else {
    return;
  }
};
export const addTheRecent = (userId, community) => async (dispatch) => {
  const cookie = document.cookie.split(";")[0].slice(6);
  const response = await fetch(`${url}/api/users/${userId}/add-recent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: cookie,
    },
    body: JSON.stringify(community),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(addRecent(data));
    return data;
  }
};
export const editTheUser = (data) => async (dispatch) => {
  dispatch(editUser(data));
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
    case ADD_RECENT: {
      newState = { ...state };
      newState.user = action.payload;
      return newState;
    }
    case UPDATE_USER: {
      newState = {};
      newState.user = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;

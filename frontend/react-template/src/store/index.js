import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import usersReducer from "./users";
import communitiesReducer from "./communities";
import imagesReducer from "./images";
import subscriptionsReducer from "./subscriptions";
import postsReducer from "./posts";
import votesReducer from "./votes";
import searchReducer from "./search";

const rootReducer = combineReducers({
  users: usersReducer,
  communities: communitiesReducer,
  images: imagesReducer,
  subscriptions: subscriptionsReducer,
  posts: postsReducer,
  votes: votesReducer,
  search: searchReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

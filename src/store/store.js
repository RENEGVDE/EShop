import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.group("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  const result = next(action);

  console.log("nextState: ", store.getState());
  console.groupEnd();

  return result;
};

const middlewares = [loggerMiddleware];

const composedEhancements = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEhancements);

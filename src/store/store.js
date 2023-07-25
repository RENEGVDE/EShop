// import { compose, createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

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

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["user"],
//   // whitelist: ["cart"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
].filter(Boolean);

// const composedEhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEhancements = composedEhancer(applyMiddleware(...middlewares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

// export const persistor = persistStore(store);

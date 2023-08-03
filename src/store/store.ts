// import { compose, createStore, applyMiddleware } from "redux";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { rootReducer, IRootState } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const loggerMiddleware: Middleware<{}, IRootState> =
  (store) => (next) => (action) => {
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

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["user"],
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Middleware<{}, IRootState>[] = [
  ...(process.env.NODE_ENV !== "production" ? [loggerMiddleware] : []),
] as Middleware<{}, IRootState>[];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);

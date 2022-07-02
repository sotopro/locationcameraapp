import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import placeReducer from "./place.slices";

export const store = configureStore({
  reducer: {
    place: placeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

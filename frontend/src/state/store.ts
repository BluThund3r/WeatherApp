import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import citiesReducer from "./cities/citiesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    city: citiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

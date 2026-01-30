import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import skillsReducer from "../features/skills/skillsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

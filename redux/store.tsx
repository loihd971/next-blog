import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postReducer from "@/redux/postSlice";

const rootReducer = combineReducers({ post: postReducer });

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

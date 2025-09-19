// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
  preloadedState: persistedState, // 앱 시작 시 로컬스토리지에서 상태 불러오기
});

// 스토어 상태가 변경될 때마다 로컬스토리지에 저장
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
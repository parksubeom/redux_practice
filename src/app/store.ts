// src/app/store.ts

// 1. combineReducers를 @reduxjs/toolkit에서 추가로 가져옵니다.
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice'; // (파일 이름은 본인 프로젝트에 맞게)
import { loadState, saveState } from '../utils/localStorage';

// 2. combineReducers를 사용해 rootReducer를 명시적으로 생성합니다.
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const persistedState = loadState();

export const store = configureStore({
  // 3. 생성한 rootReducer를 여기에 전달합니다.
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

// 4. RootState 타입을 store가 아닌 rootReducer로부터 직접 추론하도록 변경합니다.
//    이것이 타입 안정성을 더 높여줍니다.
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
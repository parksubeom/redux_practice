import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../modules"; 

const store = configureStore({
  reducer: rootReducer,
});

// 스토어의 전체 상태 타입을 정의
export type RootState = ReturnType<typeof store.getState>;

// 디스패치 타입을 정의 (선택 사항이지만 추천)
export type AppDispatch = typeof store.dispatch;

export default store;
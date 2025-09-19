// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    // 실제 앱에서는 회원가입 시 사용자 목록도 업데이트해야 합니다.
    // 여기서는 간단히 로그인 상태만 변경합니다.
    signUp: (state, action: PayloadAction<User>) => {
       // 회원가입 후 자동 로그인 처리
       state.isAuthenticated = true;
       state.currentUser = action.payload;
    }
  },
});

export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types";

/**
 * @typedef {Object} User
 * @property {string} id - 사용자 고유 ID
 * @property {string} username - 사용자 이름
 * @property {string} email - 사용자 이메일
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated - 사용자가 인증되었는지 여부
 * @property {User | null} currentUser - 현재 로그인된 사용자 정보
 */

/**
 * 초기 인증 상태입니다.
 * @type {AuthState}
 */
const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * 사용자가 로그인했을 때 상태를 업데이트합니다.
     * @param {AuthState} state - 현재 상태
     * @param {PayloadAction<User>} action - 로그인한 사용자 정보
     */
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },

    /**
     * 사용자가 로그아웃했을 때 상태를 초기화합니다.
     * @param {AuthState} state - 현재 상태
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },

    /**
     * 사용자가 회원가입 후 자동으로 로그인되도록 상태를 업데이트합니다.
     * @param {AuthState} state - 현재 상태
     * @param {PayloadAction<User>} action - 새로 가입한 사용자 정보
     */
    signUp: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;

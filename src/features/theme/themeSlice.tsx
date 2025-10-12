import { createSlice } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "light", // 초기값은 라이트 모드
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // 테마를 'light' <-> 'dark'로 전환하는 액션
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

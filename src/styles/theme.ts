// themes.ts

import { DefaultTheme } from "styled-components";

// 💡 commonColors 정의: 테마 모드에 상관없이 고정되는 색상들
export const commonColors = {
  primary: "#0d6efd",
  secondary: "#6c757d",
  success: "#198754",
  danger: "#dc3545",
  white: "#fff",
  // light, dark 등은 테마 모드에 따라 다르게 정의되므로 제외합니다.
};

// 💡 lightTheme 정의: Light Mode에 특화된 색상과 공통 색상 병합
export const lightTheme: DefaultTheme = {
  colors: {
    ...commonColors,
    light: "#f8f9fa", // 💡 테마 모드에 따라 달라지는 밝은 색상
    dark: "#212529", // 💡 테마 모드에 따라 달라지는 어두운 색상
    background: "#f8f9fa",
    cardBackground: commonColors.white,
    text: "#212529",
    border: "#dee2e6", // 경계선 색상
  },
  shadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

// 💡 darkTheme 정의: Dark Mode에 특화된 색상과 공통 색상 병합
export const darkTheme: DefaultTheme = {
  colors: {
    ...commonColors,
    light: "#495057", // 💡 테마 모드에 따라 달라지는 밝은 색상 (다크 모드용)
    dark: "#212529", // 💡 테마 모드에 따라 달라지는 어두운 색상 (다크 모드용)
    background: "#212529",
    cardBackground: "#343a40",
    text: commonColors.white,
    border: "#495057",
  },
  shadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
};

// 💡 ThemeType 정의: lightTheme/darkTheme 중 하나의 타입을 추론하여 export 합니다.
export type ThemeType = typeof lightTheme;

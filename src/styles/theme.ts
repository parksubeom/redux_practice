// src/styles/theme.ts

export const theme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#212529',
    white: '#fff',
    border: '#dee2e6',
  },
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// theme 객체의 타입을 추론하여 ThemeType 이라는 이름으로 export 합니다.
export type ThemeType = typeof theme;
export const theme = {
  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    success: "#198754",
    danger: "#dc3545",
    light: "#f8f9fa",
    dark: "#212529",
    white: "#fff",
    border: "#dee2e6",
  },
  shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export const lightTheme: DefaultTheme = {
  colors: {
    ...commonColors,
    background: "#f8f9fa", // 전체 배경: 매우 밝은 회색
    cardBackground: commonColors.white, // 카드/폼 배경: 흰색
    text: "#212529", // 텍스트 색상: 거의 검은색
    light: "#e9ecef", // 은은한 배경 (버튼 비활성 등)
    border: "#ced4da", // 경계선 색상
  },
  shadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // 밝은 그림자
};

// 💡 다크 테마 정의
export const darkTheme: DefaultTheme = {
  colors: {
    ...commonColors,
    background: "#212529", // 전체 배경: 진한 회색 (거의 검은색)
    cardBackground: "#343a40", // 카드/폼 배경: 조금 더 밝은 어두운 회색
    text: commonColors.white, // 텍스트 색상: 흰색
    light: "#495057", // 은은한 배경
    border: "#495057", // 경계선 색상
  },
  shadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // 어두운 그림자
};

// theme 객체의 타입을 추론하여 ThemeType 이라는 이름으로 export 합니다.
export type ThemeType = typeof theme;

// src/styles/styled.d.ts

import 'styled-components';
// 이 경로('./theme')와 ThemeType의 export 이름이 일치해야 합니다.
import { ThemeType } from './theme'; 

declare module 'styled-components' {
  // export 한 ThemeType을 DefaultTheme에 확장합니다.
  export interface DefaultTheme extends ThemeType {}
}
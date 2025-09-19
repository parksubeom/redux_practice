// src/styles/styled.d.ts

import 'styled-components';
import { ThemeType } from './theme';

declare module 'styled-components' {
  // export 한 ThemeType을 DefaultTheme에 확장합니다.
  export interface DefaultTheme extends ThemeType {}
}
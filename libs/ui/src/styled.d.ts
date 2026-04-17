import 'styled-components';
import type { AppTheme } from './tokens/theme.js';

/**
 * Declaration merging so `styled(Button)<{ ... }>` and `${({theme}) => ...}`
 * get full type info on `theme`. Without this, `theme` is typed as `any`.
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}

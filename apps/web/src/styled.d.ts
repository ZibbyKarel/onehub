import 'styled-components';
import type { AppTheme } from '@app/ui-tokens';

/**
 * Declaration merging so styled-components theme gets full type info.
 * This extends DefaultTheme with our AppTheme shape from @app/ui-tokens.
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}

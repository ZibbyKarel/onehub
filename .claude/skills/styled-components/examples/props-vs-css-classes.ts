import styled, { css } from 'styled-components';

// ❌ Don't: Too many boolean props
export const CardBad = styled.div`
  ${(props) => props.withBorder && `border: 1px solid #ccc;`}
  ${(props) => props.withShadow && `box-shadow: 0 2px 8px rgba(0,0,0,0.1);`}
  ${(props) => props.roundedCorners && `border-radius: 8px;`}
`;

// ✅ Do: Use variant prop or CSS class for grouped styles
export const Card = styled.div<{ variant: 'plain' | 'card' | 'elevated' }>`
  ${(props) => {
    switch (props.variant) {
      case 'card':
        return css`
          border: 1px solid #ccc;
          border-radius: 8px;
        `;
      case 'elevated':
        return css`
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        `;
      default:
        return '';
    }
  }}
`;

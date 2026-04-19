import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
}

const variantStyles = {
  primary: css`background-color: #0066cc;`,
  secondary: css`background-color: #666;`,
  danger: css`background-color: #cc0000;`,
};

const sizeStyles = {
  small: css`padding: 8px 12px; font-size: 12px;`,
  medium: css`padding: 12px 16px; font-size: 14px;`,
  large: css`padding: 16px 20px; font-size: 16px;`,
};

export const Button = styled.button<ButtonProps>`
  ${props => variantStyles[props.variant]}
  ${props => sizeStyles[props.size]}
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  ${props => props.isLoading && css`
    pointer-events: none;
    opacity: 0.7;
  `}
`;

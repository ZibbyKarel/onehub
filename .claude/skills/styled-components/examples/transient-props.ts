import styled from 'styled-components';

// ✅ Good: internal logic, not passed to DOM
export const Container = styled.div<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? 'blue' : 'gray'};
`;

// ❌ Bad: isActive gets written to DOM (styling library won't care, but it's noise)
export const ContainerBad = styled.div<{ isActive: boolean }>`
  color: ${props => props.isActive ? 'blue' : 'gray'};
`;

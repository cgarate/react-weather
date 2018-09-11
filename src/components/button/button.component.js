import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

export const Button = styled.a`
  ${tachyons};
  border-color: ${props => (props.borderColor ? props.borderColor : null)};
  color: ${props => (props.textColor ? props.textColor : null)};
`;
Button.displayName = "Button";

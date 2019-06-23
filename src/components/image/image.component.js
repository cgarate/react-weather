
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

export const Image = styled.img`
  ${tachyons}
  max-width: ${props => props.maxWidth ? props.maxWidth : null}
`;

Image.displayName = "Image";
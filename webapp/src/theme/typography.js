import styled from 'styled-components';

import { fonts, colors } from './styled';
import buttonBackground from '../images/game/ui/button.png';


export const H1 = styled.h1`
  font-family: ${fonts.arial};
  font-weight: bold;
  color: ${colors.black};
`;

export const H2 = styled.h2`
  font-family: ${fonts.arial};
  font-weight: bold;
  color: ${colors.black};
`;

export const Link = styled.a`
  text-decoration: underline;
`;

export const Button = styled.button`
  outline: 0;
  color: white;
  height: 49px;
  width: 190px;
  background-image: url(${buttonBackground});
  background-repeat: no-repeat;
  background-size: cover;
  border: 0;
  box-shadow: none;
  background-color: transparent;
  font-size: 18px;
  font-family: 'Arial';
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;


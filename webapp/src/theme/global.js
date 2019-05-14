import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;


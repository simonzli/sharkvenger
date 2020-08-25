import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0;
  }

  #root {
    min-height: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(137, 196, 244, 0.5);
    width: 100%;
  }

  #canvas {
    width: 100%;
    height: 100vh;
    max-width: 600px;
    background-color: #fff;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;

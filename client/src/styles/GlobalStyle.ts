import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(to bottom right, #eef2ff, #dbeafe);
    color: #1e293b;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  input, select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    font-size: 1rem;
  }
`

export default GlobalStyle

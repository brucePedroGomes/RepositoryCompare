import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  

}

html,body,#root {
  min-height: 100%;
}

body {
  background-color: #ACB8BF;
  -webkit-font-smoothing: antialiased !important;
}

body,input,button {
  color: #222;
  font-size: 14px;
  font-family:Arial, Helvetica, sans-serif
}

button {
  cursor: pointer;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}

`;

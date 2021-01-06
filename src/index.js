import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  );
  
  // React.StrictMode: 컴포넌트는 문제가 발생하면, 발생된 에러메세지를 바로 출력하는 모드.
import React, { BrowserRouter } from 'react-router-dom';
import './App.css';

import Page from './Page';

function App() {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // window.addEventListener 지정한 이벤트가 대상에 전달될 때마다 호출할 함수를 설정합니다
  window.addEventListener('load', setVh);
  window.addEventListener('resize', setVh);

  return (
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  );
}

export default App;

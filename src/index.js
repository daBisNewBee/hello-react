import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/*
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);
*/

// 使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名
import FunctionalComponent from './compF';
// 通过export方式导出，在导入时要加{ }，export default则不需要
import {ClassComponent} from './compC';
import {MyApp, Welcome} from './sideEffect';
import {RFast} from './fast/first';

ReactDOM.render (
  // <FunctionalComponent />,
  // < ClassComponent />,
  // <Welcome name="张三" />,
  // <MyApp />,
    <RFast />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

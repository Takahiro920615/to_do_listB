import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Todos from './components/todos/index';
import './index.css'

// indexedDB.htmlのroot要素の箇所にHelloWorldコンポーネントをレンダリングしている
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Todos />
  </React.StrictMode>,
)

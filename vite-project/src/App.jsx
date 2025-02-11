import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todos/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
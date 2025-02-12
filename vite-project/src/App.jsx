import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todos';



function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todos';
import { DemoCalendar} from './components/Calendar';



function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/calendar" element={<DemoCalendar />}/>
      </Routes>
    </Router>
  );
}

export default App;

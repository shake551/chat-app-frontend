import React from 'react';
import {BrowserRouter, Route, Routes} from  'react-router-dom'

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

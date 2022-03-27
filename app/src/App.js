import React from 'react';
import {BrowserRouter, Route, Routes} from  'react-router-dom'

import Home from './components/Home';
import SignupForm from './components/signup/SignupForm';
import SignupComplete from './components/signup/SignupComplete';
import VerifyUser from './components/signup/VerifyUser';
import LoginForm from './components/LoginForm';
import LoginUser from './components/LoginUser';
import CreateRoom from './components/chat/CreateRoom';
import Message from './components/chat/Message';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/complete" element={<SignupComplete />} />
        <Route exact path="/verify/*" element={<VerifyUser />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<LoginUser />} />
        <Route path="/room/create" element={<CreateRoom />} />
        <Route path="/chat/*" element={<Message />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

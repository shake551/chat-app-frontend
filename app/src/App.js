import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './components/Home';
import SignupForm from './components/signup/SignupForm';
import SignupComplete from './components/signup/SignupComplete';
import VerifyUser from './components/signup/VerifyUser';
import LoginForm from './components/LoginForm';
import UserHome from './components/user/UserHome';
import UserProfile from "./components/user/UserProfile";
import CreateNewRoom from './components/chat/CreateNewRoom';
import MessageList from './components/chat/MessageList';
import NotFound from './components/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<SignupForm/>}/>
                <Route exact path="/complete" element={<SignupComplete/>}/>
                <Route exact path="/verify/*" element={<VerifyUser/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/user/home" element={<UserHome/>}/>
                <Route path="/user/profile" element={<UserProfile/>}/>
                <Route path="/room/create" element={<CreateNewRoom/>}/>
                <Route path="/chat/*" element={<MessageList/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

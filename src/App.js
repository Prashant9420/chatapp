import './App.css';
import React from 'react'
import Chatbox from './components/chatbox';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import SigninPage from './components/signinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SigninPage/>}/>
        <Route path='/chatbox' element={<Chatbox/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
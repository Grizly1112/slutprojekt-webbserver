import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import Chat from './Pages/Chat'
import Login from './components/Login'
import Register from './components/Register'
import User from './Pages/User'
import TermsService from './Pages/TermsService'
import PageNotFound from './components/404'
import Navbar from './components/Navbar'


/* Rendering the React app to the DOM. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/members" element={<Use />} /> */}
        <Route path="/user/:id" element={<User />}/>
        <Route path="/terms" element={<TermsService />}/>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

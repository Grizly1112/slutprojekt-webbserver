/* Importing modules. */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Route, Routes } from "react-router-dom";

// Proivders
import AppProvider from './Provider/AppProvider';

// Pages
import Home from './Pages/Home/Home'
import Chat from './Pages/Chatt/Chat'
import Members from './Pages/Members/Members';
import User from './Pages/Members/components/User'
import TermsService from './Pages/TermsService/TermsService'


// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/404';


/* Rendering the React app to the DOM. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/members" element={<Members />}>
            
            <Route path="user/:id" element={<User />}/>



          </Route>
          <Route path="/terms" element={<TermsService />}/>
          <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

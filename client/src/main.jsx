/* Importing modules. */
import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Route, Routes } from "react-router-dom";

// Proivders
import AppProvider from './Provider/AppProvider';

// Pages
// import Chat from './Pages/Chatt/Chat'
// import Members from './Pages/Members/Members';
// import User from './Pages/Members/components/User'
// import TermsService from './Pages/TermsService/TermsService'


// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/404';
import ProfilePost from './Pages/Members/components/ProfilePost';
import AboutUser from './Pages/Members/components/AboutUser';
import UserFriends from './Pages/Members/components/UserFriends';
import Footer from './components/Footer';


// Pages
const Home = lazy(() => import('./Pages/Home/Home'))
const Members = lazy(() => import('./Pages/Members/Members'))
const User = lazy(() => import('./Pages/Members/components/User'))
const TermsService = lazy(() => import('./Pages/TermsService/TermsService'))


/* Rendering the React app to the DOM. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
      <Navbar />

      {/* Routes */}
      <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Register */}
          <Route path="/register" element={<Register />} />

          {/* Members nested Routing */}
          <Route path="/members" element={<Members />}>
            <Route path="user/:id" element={<User />}>
              <Route path='' element={<ProfilePost />} />
              <Route path='friends' element={<UserFriends />} />
              <Route path='about' element={<AboutUser />} />
            </Route>
          </Route>
          
          {/* Terms of service */}
          <Route path="/terms" element={<TermsService />}/>
          
          {/* 404 */}
          <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

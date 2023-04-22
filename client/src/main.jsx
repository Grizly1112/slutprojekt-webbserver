import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import AppProvider from './Provider/AppProvider';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/404';
import ProfilePost from './Pages/Members/components/ProfilePost';
import AboutUser from './Pages/Members/components/AboutUser';
import UserFriends from './Pages/Members/components/UserFriends';
import Footer from './components/Footer';
import { Loader } from './components/assets/Loader';
import Admin from './Pages/Admin/Admin';

const Home = lazy(() => import('./Pages/Home/Home'));
const Members = lazy(() => import('./Pages/Members/Members'));
const User = lazy(() => import('./Pages/Members/components/User'));
const TermsService = lazy(() => import('./Pages/TermsService/TermsService'));

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/members" element={<Members />}>
                <Route path="user/:id" element={<User />}>
                  <Route path="" element={<ProfilePost />} />
                  <Route path="friends" element={<UserFriends />} />
                  <Route path="about" element={<AboutUser />} />
                </Route>
              </Route>
              <Route path="/terms" element={<TermsService />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
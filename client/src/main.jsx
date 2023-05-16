import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import './index.css';
import AppProvider from './Provider/AppProvider';
import Navbar from './components/Navbar';
const Register = lazy(() => import('./components/Register'));
const PageNotFound = lazy(() => import('./components/404'));
const ProfilePost = lazy(() => import('./Pages/Members/components/ProfilePost'));
const AboutUser = lazy(() => import('./Pages/Members/components/AboutUser'));
import Footer from './components/Footer';
import { Loader } from './components/assets/Loader';
import Forum from './Pages/Forum/Forum';

// Lazy-loaded components / pages
const Login = lazy(() => import('./components/Login'));
const GlobalChat = lazy(() => import('./Pages/Home/GlobalChat'));
const UserFriends = lazy(() => import('./Pages/Members/components/UserFriends'));
const Admin = lazy(() => import('./Pages/Admin/Admin'));
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
              <Route path="/forum" element={<Forum />} />
              <Route path="/terms" element={<TermsService />} />
              <Route path="/chat" element={<GlobalChat />} />
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
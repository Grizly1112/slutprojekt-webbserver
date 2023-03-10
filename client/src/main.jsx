import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/404";
import Forum from './Pages/Forum'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forum />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  </React.Fragment>,
)

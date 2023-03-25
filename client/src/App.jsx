import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/404";
import Forum from "./Pages/Forum";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./Pages/Chat";
import User from "./Pages/User";
import TermsService from "./Pages/TermsService";
import Test from "./Pages/Test";
import Home from "./Pages/Home";

function App() {

  return(
    <>
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
        <Route path="/test" element={<Test/>} />
      </Routes>
    </>
  )
}


export default App;
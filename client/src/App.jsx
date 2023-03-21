import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/404";
import Forum from "./Pages/Forum";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./Pages/Chat";

function App() {

  return(
    <>
    <Navbar />
     <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}


export default App;
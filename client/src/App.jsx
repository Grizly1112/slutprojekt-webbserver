import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/404";
import Forum from "./Pages/Forum";
import { Route, Routes } from "react-router-dom";

function App() {

  return(
    <>
    <Navbar />
     <Routes>
        <Route path="/" element={<Forum />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}


export default App;
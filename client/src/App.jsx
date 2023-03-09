import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/404";

function App() {

  return(
    <>
      <Routes>
        <Route path="/" element={<p>Startsida</p>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}


export default App;
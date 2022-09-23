import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DogDetail from "./components/DogDetail";
import Formdog from "./components/Formdog";
import Home from "./components/Home.js";
import Landingpage from "./components/Landingpage";
import Nav from './components/Nav.js'
import NotFound from "./components/NotFound";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Landingpage/>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/Newdog" element={<Formdog/>} />
      <Route path='/dogs/:id' element={<DogDetail/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;

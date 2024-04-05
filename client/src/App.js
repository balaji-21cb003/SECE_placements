import "./App.css";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Thirdyear from "./components/3rd year/thirdyear";
import CSBS from "./components/3rd year/3rd csbs/csbs";
import Firstyear from "./components/1st year/firstyear";
import Secondyear from "./components/2nd year/secondyear";
import Fourthyear from "./components/4th year/fourthyear";
import CSE from "./components/3rd year/3rd cse/cse";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firstyear" element={<Firstyear />} />
        <Route path="/secondyear" element={<Secondyear />} />
        <Route path="/thirdyear" element={<Thirdyear />} />
        <Route path="/fourthyear" element={<Fourthyear />} />

        <Route path="/thirdyear/csbs" element={<CSBS />} />
        <Route path="/thirdyear/cse" element={<CSE />} />
      </Routes>
    </div>
  );
}

export default App;

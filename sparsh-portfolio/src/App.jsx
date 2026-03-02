import { Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import Cursor from "./components/Cursor";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// import Projects from "./components/Projects"
// import About from "./components/About"
// import Footer from "./components/Footer"


export default function App() {
  return (
    <div className="bg-graphite-950 text-platinum-50 ">
      <Cursor/>
      <Navbar/>
      {/* <Projects /> */}
      {/* <About /> */}
      {/* <Footer /> */}
      
      <ScrollToTop/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
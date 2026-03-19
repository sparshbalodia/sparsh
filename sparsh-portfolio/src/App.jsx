import { useState } from "react";
import { Routes, Route} from "react-router-dom";
import useLenis from "./hooks/useLenis";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar"
import Cursor from "./components/Cursor";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import { Analytics } from "@vercel/analytics/react"

export default function App() {

  const [preloaderDone, setPreloaderDone] = useState(false);

  useLenis();
  
  return (
    <div className="bg-graphite-950 text-platinum-50 ">
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      <Cursor/>
      <Navbar preloaderDone={preloaderDone} />
      
      <ScrollToTop/>

      <Routes>
        <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

      <Analytics />
    </div>
  );
}
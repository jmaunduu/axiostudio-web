import React, { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Landing from './pages/Landing';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => { });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-black selection:text-white relative">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </div>
  );
}

export default App;

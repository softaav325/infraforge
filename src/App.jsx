import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-premium-black selection:bg-premium-primary/30 overflow-x-hidden">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero />
        <Services />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </motion.main>
      <footer className="py-12 border-t border-white/5 text-center relative z-10">
        <p className="text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} Syte2 Infrastructure. <span className="text-premium-primary">Built for Scale.</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

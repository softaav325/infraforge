import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './UI';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Stack', href: '#stack' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div 
        className={`max-w-7xl mx-auto transition-all duration-300 ease-in-out rounded-full px-4 py-2 flex items-center justify-between 
        ${isScrolled 
          ? 'glass py-2 shadow-2xl border-white/20' 
          : 'bg-transparent py-4 border-transparent'}`}
      >
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-premium-primary rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">INFRA<span className="text-premium-primary">FORGE</span></span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full
              ${activeSection === link.href.substring(1) ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-0 bg-premium-primary/10 rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Button variant="primary" className="px-5 py-1.5 text-sm rounded-full">
            Hire Me
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-2 p-4 glass rounded-premium flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all
                ${activeSection === link.href.substring(1) 
                  ? 'bg-premium-primary/20 text-premium-primary' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="w-full py-3">
              Hire Me
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

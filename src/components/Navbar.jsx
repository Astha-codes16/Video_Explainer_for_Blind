import React, { useState } from 'react';
import { User, HelpCircle, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

// --- GSAP IMPORTS ---
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // --- GSAP ANIMATION ---
  // This animates the Navbar sliding down from the top on load
  useGSAP(() => {
    gsap.fromTo("nav", 
      { y: "-100%" }, 
      { y: 0, duration: 0.5, ease: "power2.out" }
    );
  });

  const isActive = (path) => location.pathname === path;

  // --- HELPER COMPONENT ---
  const NavItem = ({ to, label }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        className="relative group flex flex-col items-center justify-center text-sm font-medium text-gray-400 hover:text-white transition-colors py-1"
      >
        <span className={active ? 'text-white font-bold' : ''}>{label}</span>
        <span 
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 origin-center transition-transform duration-300 ease-out
            ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
          `}
        ></span>
      </Link>
    );
  };

  return (
    // Added 'nav' className target for GSAP
    <nav className="relative bg-[#18181b] border-b border-gray-800 z-50">
      <div className="flex items-center justify-between px-6 h-16">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-white font-bold text-xl tracking-wide flex items-center gap-2">
            <img src={logo} alt="VisionCast Logo" className="h-8 w-8 object-contain" />
            VISIONCAST
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavItem to="/" label="Home" />
          <NavItem to="/upload" label="Upload Video" />
          <NavItem to="/library" label="My Library" />

          <a href="#" className="relative group flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors py-1">
            <span>How It Works</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:flex items-center gap-4 text-gray-400 text-sm border-l border-gray-700 pl-6 hover:text-white transition-colors">
            <div className="flex items-center gap-1">
              <HelpCircle size={18} />
              <span>Profile</span>
            </div>
            <div className="bg-gray-700 rounded-full p-1.5 text-gray-300">
              <User size={20} />
            </div>
          </a>

          <button className="md:hidden text-gray-300 hover:text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#18181b] border-b border-gray-800 animate-fade-in shadow-2xl">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 font-medium hover:text-white py-2 border-b border-gray-800">Home</Link>
            <Link to="/upload" onClick={() => setIsMenuOpen(false)} className="text-teal-400 font-bold py-2 border-b border-gray-800">Upload Video</Link>
            <Link to="/library" onClick={() => setIsMenuOpen(false)} className="text-gray-300 font-medium hover:text-white py-2 border-b border-gray-800">My Library</Link>
            <a href="#" className="flex items-center gap-3 text-gray-300 font-medium hover:text-white py-2 mt-2">
              <div className="bg-gray-700 rounded-full p-1"><User size={18} /></div> Profile / Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
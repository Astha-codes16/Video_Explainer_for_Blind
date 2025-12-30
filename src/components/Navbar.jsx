import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const navRef = useRef(null);
  const modalRef = useRef(null);

  // Navbar animation
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: "-100%" },
      { y: 0, duration: 0.5, ease: "power2.out" }
    );
  });

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, label }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className="relative group text-sm font-medium text-gray-400 hover:text-white transition py-1"
      >
        <span className={active ? "text-white font-bold" : ""}>{label}</span>
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 transition-transform duration-300
            ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
          `}
        />
      </Link>
    );
  };

  return (
    <nav
      ref={navRef}
      className="relative bg-[#18181b] border-b border-gray-800 z-50"
    >
      <div className="flex items-center justify-between px-6 h-16">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="VisionCast Logo" className="h-8 w-8" />
          <span className="text-white font-bold text-xl">VISIONCAST</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem to="/" label="Home" />

          {!token && (
            <>
              <NavItem to="/about" label="About Us" />
              <NavItem to="/contact" label="Contact Us" />
              <NavItem to="/working" label="How it works" />
            </>
          )}

          {token && (
            <>
              <NavItem to="/upload" label="Upload Video" />
              <NavItem to="/library" label="My Library" />
              <NavItem to="/about" label="About Us" />
              <NavItem to="/contact" label="Contact Us" />
              <NavItem to="/working" label="How it works" />
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* AUTH / PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                if (!token) navigate("/auth/login");
                else setOpenModal(!openModal);
              }}
              className={`flex items-center gap-3 rounded-full text-sm px-6 py-2 transition
                ${
                  token
                    ? "bg-transparent text-gray-300 hover:text-white"
                    : "bg-primary text-white hover:opacity-90"
                }
              `}
            >
              {token ? (
                <div className="bg-gray-700 rounded-full p-1.5 text-gray-300">
                  <User size={20} />
                </div>
              ) : (
                "Signup / Login"
              )}
            </button>

            {/* PROFILE DROPDOWN */}
            {openModal && token && (
              <div
                ref={modalRef}
                className="absolute right-0 top-full mt-3 w-48 bg-[#1c1d1f]
                border border-gray-700  shadow-xl z-50"
              >
                

                <button
                  onClick={() => {
                    navigate("/library");
                    setOpenModal(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700"
                >
                  My Library
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setOpenModal(false);
                    navigate("/");
                  }}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#18181b] border-t border-gray-800">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>

            {!token && (
              <>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                <Link to="/working" onClick={() => setIsMenuOpen(false)}>How it works</Link>
              </>
            )}

            {token && (
              <>     
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                <Link to="/upload" onClick={() => setIsMenuOpen(false)}>Upload Video</Link>
                <Link to="/library" onClick={() => setIsMenuOpen(false)}>My Library</Link>
                <Link to="/working" onClick={() => setIsMenuOpen(false)}>How it works</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

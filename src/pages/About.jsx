import React from 'react';
import aboutImg from '../assets/about.jpeg'; // Ensure this path is correct

const About = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#18181b] px-6 py-12 overflow-hidden">
      
      {/* RESPONSIVE GRID:
         - grid-cols-1: On mobile, 1 column (stacked vertically)
         - md:grid-cols-2: On tablet/desktop, 2 columns (side by side)
      */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* LEFT SIDE: Text Content */}
        {/* 'animate-fade-in-up' makes it slide up and fade in on load */}
        <div className="space-y-8 opacity-0 animate-[fadeInLeft_1s_ease-out_forwards]">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              About VisionCast
            </h1>
            {/* Animated Underline */}
            <div className="h-1 w-0 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.7)] animate-[growLine_1s_ease-out_forwards_0.5s]"></div>
          </div>

          <h2 className="text-2xl font-semibold text-teal-400">
            Building the future of Video Intelligence.
          </h2>
          
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
            <p>
              <span className="text-white font-semibold">VisionCast</span> is more than just a tool; 
              we are a team of engineers and creators passionate about unlocking the data hidden inside video content.
            </p>
            <p>
              We replace opaque, manual processes with transparent, AI-driven analysis—empowering developers 
              to build faster and smarter.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Image */}
        {/* 'delay-300' waits 300ms before starting so it flows after the text */}
        <div className="flex justify-center items-center relative opacity-0 animate-[fadeInRight_1s_ease-out_forwards_0.3s]">
          
          {/* Background Glow Effect */}
          <div className="absolute w-[80%] h-[80%] bg-teal-500/20 blur-[60px] -z-10 rounded-full animate-pulse"></div>

          <img 
            src={aboutImg} 
            alt="About VisionCast Team" 
            className="w-full max-w-[350px] md:max-w-md h-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 border border-gray-800"
          />
        </div>

      </div>

      {/* CUSTOM ANIMATION STYLES */}
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes growLine {
          from { width: 0; }
          to { width: 6rem; } /* 24 tailwind units */
        }
      `}</style>
    </div>
  );
};

export default About;
import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  useGSAP(() => {
    gsap.fromTo(
      cardContainerRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: cardContainerRef.current,
          start: "top 100%",
          end: "bottom 0%",
        },
      }
    );
  });

  const navigate = useNavigate(); // Ensure you define this or pass it as a prop
  const cardContainerRef = useRef();

  return (
    <>
      {/* HERO SECTION: Increased my-10 to my-20 and gap to 16 */}
      <div className="flex flex-col lg:flex-row items-center justify-between my-20 mx-8 sm:mx-20 xl:mx-44 gap-16">
        <div className="lg:flex-2 text-left">
          {/* Heading scaled from 6xl to 7xl */}
          <h1 className="text-4xl sm:text-7xl font-bold sm:leading-[1.1] text-[#FEFFFF]">
            Unlock the world of video for <br />
            <span className="text-primary">Everyone</span>
          </h1>
          {/* Paragraph scaled to text-xl / 1.5rem */}
          <p className="text-xl my-8 sm:text-[1.4rem] text-gray-300 max-w-3xl leading-relaxed">
            Automated AI-powered accessibility. Generate detailed Audio
            description for any video instantly with precision.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            <button
              onClick={() => navigate("/auth/login")}
              className="px-10 py-4 text-xl text-[#09090b] bg-[#4DB6AC] hover:bg-[#45a29a] active:scale-95 transition-all duration-300 rounded-xl font-bold animate-fade-in-up 
  /* Glowing Effect using your teal color */
  shadow-[0_0_20px_5px_rgba(77,182,172,0.4)] 
  hover:shadow-[0_0_35px_10px_rgba(77,182,172,0.6)]"
            >
              Get started - It's free
            </button>
            <button className="watchDemo px-10 py-4 text-xl text-white border-2 border-white/20 active:scale-95 hover:bg-white/10 transition rounded-xl font-bold">
              Watch demo
            </button>
          </div>
        </div>

        <div className="lg:flex-1 flex justify-center lg:justify-end w-full">
          {/* Increased image max-width */}
          <img
            src="/Untitled.png"
            alt="VisionCast Illustration"
            className="relative w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl scale-110"
          />
        </div>
      </div>

      {/* FEATURE GRID: Increased h-52 to h-72 and gap to 10 */}
      <div
        ref={cardContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 my-24 mb-32 mx-8 sm:mx-20 xl:mx-44"
      >
        {[
          {
            title: "Smart Narration",
            desc: "AI describes actions, emotions and text of the video",
          },
          {
            title: "Seamless Integration",
            desc: "Descriptions timed to fit perfectly in silent gaps",
          },
          {
            title: "Custom Experience",
            desc: "Choose between Read Frame, Read Complete and more",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="h-72 w-full bg-[#2D2D31] border border-white/10 rounded-3xl p-10 text-center flex flex-col items-center justify-center transition-all hover:bg-[#35363a] hover:-translate-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FEFFFF] mb-4">
              {feature.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
       
         {/* REVIEW SECTION */}
         <div className="my-32">
            <div className='mx-8 sm:mx-20 xl:mx-44'>
                <h1 className='text-4xl sm:text-7xl font-bold sm:leading-[1.1] text-[#FEFFFF]'>
                Trusted by <span className="text-primary">Visionaries</span> Worldwide
                </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 mb-32 mx-8 sm:mx-20 xl:mx-44'>
                {[
                    { 
                        name: "Sarah Jenkins", 
                        role: "Accessibility Expert", 
                        desc: "VisionCast is a game-changer. The AI's ability to describe emotions in real-time is something I haven't seen elsewhere." 
                    },
                    { 
                        name: "Marcus Chen", 
                        role: "Content Creator", 
                        desc: "I used to spend hours writing descriptions. Now, VisionCast handles the heavy lifting perfectly. A must-have for creators." 
                    },
                    { 
                        name: "Elena Rodriguez", 
                        role: "Special Educator", 
                        desc: "My visually impaired students can finally follow along with any video seamlessly. The timing is absolutely spot on." 
                    }
                ].map((review, i) => (
                    <div key={i} className="min-h-72 w-full bg-[#2D2D31] border border-white/10 rounded-3xl p-10 flex flex-col justify-between transition-all hover:border-primary/40">
                        <p className="text-lg italic text-gray-300 leading-relaxed mb-6">
                            "{review.desc}"
                        </p>
                        <div>
                            <h2 className="text-xl font-bold text-[#FEFFFF]">{review.name}</h2>
                            <p className="text-primary text-sm font-semibold uppercase tracking-widest">{review.role}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
    </>
  );
};

export default Header;

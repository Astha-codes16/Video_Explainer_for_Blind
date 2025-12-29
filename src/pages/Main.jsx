import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Main = () => {
  const navigate = useNavigate();

  // Search input
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Narrator dropdown
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voice, setVoice] = useState("Male Voice");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    setInput(value);
    console.log("Question:", value);
    console.log("Selected Voice:", voice);
  };

  return (
    <>
      

      {/* Header */}
      <div className="text-center py-16 px-8 sm:px-20 xl:mx-44">
        <h1 className="text-4xl sm:text-7xl font-bold text-[#FEFFFF]">
          Main functionality page
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10 mb-24 mx-8 sm:mx-20 xl:mx-44">

        {/* LEFT SECTION */}
        <div className="lg:flex-[2] flex flex-col gap-10">

          {/* Video */}
          <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden">
            <video
              className="w-full h-full"
              controls
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
          </div>

          {/* Controls Box */}
          <div className="min-h-[250px] bg-[#2D2D31] border border-white/10 rounded-3xl p-6">
            <div className="w-full max-w-4xl mx-auto space-y-12">

              {/* Buttons Row */}
              <div className="flex justify-between items-center gap-4">

                <button
                  onClick={() => navigate("/auth/signin")}
                  className="px-10 py-4 text-lg text-white bg-[#35363A] rounded-xl font-semibold
                             border border-white/10 hover:bg-primary/80 hover:-translate-y-0.5
                             active:scale-95 transition-all"
                >
                  Read Frame
                </button>

                <button
                  onClick={() => navigate("/auth/signin")}
                  className="px-10 py-4 text-lg text-white bg-[#35363A] rounded-xl font-semibold
                             border border-white/10 hover:bg-primary hover:-translate-y-0.5
                             active:scale-95 transition-all"
                >
                  Read Complete
                </button>

                {/* Narrator Voice Dropdown */}
                <div className="relative">

                  <button 
                    type="button"
                    onClick={() => setVoiceOpen(!voiceOpen)}
                    className="px-10 py-4 flex items-center gap-3 text-lg text-white bg-[#35363A] rounded-xl font-semibold
                               border border-white/10 hover:bg-primary hover:-translate-y-0.5
                               active:scale-95 transition-all"
                  >
                    {voice}
                    <img src="drop_arrow.svg" alt='arrow' className='w-6 h-6 text-white'/>
                  </button>

                  {voiceOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-[#2D2D31]
                                    border border-white/10 rounded-xl shadow-xl
                                    overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setVoice("Male Voice");
                          setVoiceOpen(false);
                        }}
                        className="w-full px-6 py-3 text-left text-white
                                   hover:bg-primary/20 transition"
                      >
                        Male Voice
                      </button>

                      <button
                        onClick={() => {
                          setVoice("Female Voice");
                          setVoiceOpen(false);
                        }}
                        className="w-full px-6 py-3 text-left text-white
                                   hover:bg-primary/20 transition"
                      >
                        Female Voice
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Bar */}
              <form
                onSubmit={onSubmitHandler}
                className="flex items-center w-full bg-white rounded-2xl shadow-lg
                           overflow-hidden ring-1 ring-gray-200
                           focus-within:ring-primary transition"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a question about the video…"
                  className="flex-1 px-6 py-4 text-lg outline-none
                             text-gray-700 placeholder-gray-400"
                />

                <button
                  type="submit"
                  className="px-8 py-4 bg-primary text-white font-semibold
                             hover:bg-primary/90 transition"
                >
                  Ask
                </button>
              </form>

            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:flex-1">
          <div className="h-full min-h-[690px] bg-[#2D2D31]
                          border border-white/10 rounded-3xl p-10
                          flex items-center justify-center">
            <h1 className="text-3xl font-bold text-[#FEFFFF]">
              Right Sidebar
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

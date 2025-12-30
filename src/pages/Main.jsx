import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const textChunks = [
  "AI summarized the discussion.",
  "User asked a follow-up question.",
  "Key insight: accessibility is crucial.",
  "Action item: refine UI for blind users.",
  "Reminder: test narration overlap logic.",
  "New idea added to brainstorming pool.",
  "Consensus reached on final feature set.",
  "AI summarized the discussion.",
  "User asked a follow-up question.",
  "Key insight: accessibility is crucial.",
  "Action item: refine UI for blind users.",
  "Reminder: test narration overlap logic.",
  "New idea added to brainstorming pool.",
  "Consensus reached on final feature set.",
];

const Main = () => {
  const navigate = useNavigate();

  /* ----------------THE STATE ---------------- */
  const [speechRate, setSpeechRate] = useState(1);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voice, setVoice] = useState("Male Voice");
  const [activeIndex, setActiveIndex] = useState(null);
  
  // AI Panel State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#1A1A1E] text-white">
      

      {/* Header */}
      <div className="text-center py-10 px-6">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#FEFFFF]">
          Main functionality page
        </h1>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex flex-col lg:flex-row mx-4 sm:mx-10 xl:mx-20 mb-10 lg:h-[75vh] gap-6">
        
        
        <div className="lg:w-[60%] flex flex-col gap-4">
          {/* Video Player */}
          <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <video
              className="w-full h-full"
              controls
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
          </div>

          {/* Video Controls / Actions */}
          <div className="bg-[#2D2D31] border border-white/10 rounded-3xl p-5">
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/auth/signin")}
                  className="px-5 py-2.5 bg-[#35363A] hover:bg-primary/80 text-sm font-semibold rounded-xl border border-white/10 transition"
                >
                  Read Frame
                </button>
                <button
                  onClick={() => navigate("/auth/signin")}
                  className="px-5 py-2.5 bg-[#35363A] hover:bg-primary/80 text-sm font-semibold rounded-xl border border-white/10 transition"
                >
                  Read Complete
                </button>
                <button 
                  onClick={() => setIsAiOpen(true)}
                  className="px-5 py-2.5 bg-[#35363A] hover:bg-primary/80 text-sm font-semibold rounded-xl border border-white/10 transition"
                >
                  Have a doubt? Ask AI
                </button>
              </div>

              {/* Voice Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setVoiceOpen(!voiceOpen)}
                  className="px-5 py-2.5 bg-primary/20 text-primary border border-primary/30 text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition"
                >
                  {voice} ▾
                </button>

                {voiceOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-40 bg-[#2D2D31] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                    {["Male Voice", "Female Voice"].map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setVoice(v);
                          setVoiceOpen(false);
                        }}
                        className="block w-full px-4 py-3 text-left text-sm hover:bg-primary/20 transition"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (30% Width) ================= */}
        <div className="lg:w-[35%] flex flex-col relative h-full">
          <div className="bg-[#2D2D31] border border-white/10 rounded-3xl p-4 flex flex-col gap-4 h-full relative overflow-hidden shadow-xl">
            
            {/* Script Section */}
            <div className="flex-1 bg-[#1F1F23] rounded-2xl p-4 flex flex-col overflow-hidden">
              <div className="text-center mb-4">
                <h2 className="text-primary font-bold text-center text-sm uppercase tracking-wider">Accessibility Script</h2>
              
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {textChunks.map((text, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`cursor-pointer rounded-xl p-3 text-sm transition-all border
                      ${activeIndex === index
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-white/5 border-transparent text-gray-300 hover:bg-white/10"
                      }`}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Speaking Rate & Download Buttons */}
            <div className="bg-[#1A1A1E] rounded-2xl p-5 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-400 font-bold uppercase">Rate</label>
                <span className="text-primary font-mono font-bold">{speechRate.toFixed(1)}x</span>
              </div>

              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary mb-4"
              />

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-primary text-white rounded-xl font-bold text-xs hover:opacity-90 transition">
                  Download
                </button>
                <button className="flex-1 py-2 bg-[#35363A] text-white rounded-xl font-bold text-xs hover:bg-white/10 transition">
                  Share
                </button>
              </div>
            </div>

            {/* ================= AI DRAWER (Sliding Up) ================= */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-[#252529] border-t border-white/20 transition-all duration-500 ease-in-out z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${
                isAiOpen ? "h-[85%] opacity-100" : "h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold text-xs tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    AI Assistant
                  </h3>
                  <button 
                    onClick={() => setIsAiOpen(false)}
                    className="text-gray-400 hover:text-white transition p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* AI Conversation Space */}
                <div className="flex-1 bg-[#1A1A1E] rounded-xl p-4 mb-4 overflow-y-auto border border-white/5 text-xs text-gray-400">
                  <p className="mb-4 text-primary font-semibold italic">Analyzing video frame...</p>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 max-w-[90%]">
                    How can I help you with this accessibility script today?
                  </div>
                </div>

                {/* Input Field */}
                <div className="relative">
                  <input 
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full bg-[#1F1F23] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-primary/50 transition"
                  />
                  <button className="absolute right-2 top-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:scale-105 transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
            {/* End AI Drawer */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
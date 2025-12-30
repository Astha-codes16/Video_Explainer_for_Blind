import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#18181b] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl border border-gray-800">
        
        {/* LEFT SIDE: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-2">Get in touch</h1>
          <p className="text-gray-400 mb-8">We are here for you! How can we help?</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name <span className="text-teal-500">*</span></label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name" 
                required 
                className="w-full bg-[#09090b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email <span className="text-teal-500">*</span></label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" 
                required 
                className="w-full bg-[#09090b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Go ahead, we're listening..." 
                className="w-full bg-[#09090b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all resize-none placeholder-gray-600"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-teal-500/20"
            >
              {isSubmitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Image */}
        <div className="relative hidden md:block bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2671&auto=format&fit=crop" 
            alt="Contact Support" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-12 left-12 right-12">
            <h3 className="text-2xl font-bold text-white mb-2">VisionCast Support</h3>
            <p className="text-gray-300">
              Our team is available 24/7 to help you with your video processing needs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
import React from 'react'
import { footer_data } from '../assets/assets'
const Footer = () => {
  return (
      /* Increased vertical padding to py-16 */
      <div className='px-8 md:px-20 lg:px-32 xl:px-44 bg-primary'>
          <div className='flex flex-col md:flex-row items-start justify-between gap-16 py-16 border-b border-gray-500/30 text-white'>
              <div className="flex-1">
                  <h3 className='font-bold text-xl text-white mb-6'>About Us</h3>
                  <p className='max-w-[500px] text-lg leading-relaxed opacity-90'>
                      We are dedicated to making visual content accessible to everyone. 
                      Our AI-driven technology bridges the gap between sight and sound.
                  </p>
              </div>
              
              <div className='flex flex-wrap justify-between w-full lg:flex-[1.5] gap-8'>
                  {footer_data.map((section, index) => (
                      <div key={index} className="min-w-[150px]">
                          <h3 className='font-bold text-lg text-white mb-6'>{section.title}</h3>
                          <ul className='text-base space-y-3 opacity-80'>
                              {section.links.map((link, i) => (
                                  <li key={i}>
                                      <a href='#' className='hover:underline hover:opacity-100 transition'>{link}</a>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>
          {/* Scaled bottom text */}
          <p className='py-8 text-center text-base md:text-lg text-white font-medium'>
              Copyright 2025 @ VisionCast All Rights Reserved
          </p>
      </div>
  );
};

export default Footer

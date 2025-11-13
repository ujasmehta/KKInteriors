import React from 'react';
import { Mail, Smartphone, MapPin, Edit } from 'lucide-react';


const WaveAccent = () => (
  <svg 
    className="w-full h-2 my-1" 
    viewBox="0 0 100 8" 
    preserveAspectRatio="none" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0 4C10 8 20 0 30 4C40 8 50 0 60 4C70 8 80 0 90 4C95 6 100 4" 
      stroke="#B8946E" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
  </svg>
);


const lorem = "Lorem ipsum dolor sit amet consectetur. Nam ante euiusmod eu semper neque. Tempor magna vitae auctor magna neque varius vitae donec.";

const page = () => {

  const accentColor = "#B8946E"; 
  const accentBorder = `1.5px solid ${accentColor}`;

  return (
    <div className="min-h-screen bg-white font-['Inter'] text-gray-800">
      
     
      <section className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24 pb-12 text-center">
        
       
        <h1 className="text-3xl sm:text-4xl font-normal tracking-widest uppercase text-gray-800">
          ABOUT US
        </h1>
        <WaveAccent />
        
       
        <div 
          className="w-full max-w-3xl mx-auto h-52 sm:h-72 mt-10 mb-12 border rounded-sm bg-gray-50/50 flex items-center justify-center"
          style={{ borderColor: "#D3D3D3" }} 
        >
          <span className="text-gray-300 text-xl font-light">Content/Image Placeholder</span>
        </div>

       
        <div className="text-center mb-20">
          <p className="text-xs text-gray-600 max-w-xl mx-auto leading-relaxed">
            {lorem} Aliquam ullamcorper felis nibh viverra id ut elementum quis. Vel iaculis vitae ornare ac pellentesque nec elementum. Duis pretium massa vel molestie auctor massa vel efficitur.
          </p>
        </div>
      </section>

     
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center border-t border-b border-gray-100">

      
        <h2 className="text-3xl sm:text-4xl font-normal tracking-widest uppercase text-gray-800">
          OUR EXPERTISE
        </h2>
        <WaveAccent />

        
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          
        
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
             
              <div 
                className="w-full h-72 border rounded-sm shadow-sm bg-gray-50/50 mb-6"
                style={{ borderColor: "#D3D3D3", maxWidth: '300px' }} 
              />
              
             
              <h3 className="text-lg font-medium text-gray-900 mb-1 uppercase tracking-wide">
                EXPERTISE {num}
              </h3>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Nam ante euiusmod eu semper neque.
              </p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">

       
        <h2 className="text-3xl sm:text-4xl font-normal tracking-widest uppercase text-gray-800">
          CONTACT US
        </h2>
        <WaveAccent />

      
        <div className="mt-16 grid grid-cols-3 gap-8">
          
          
          <div className="flex flex-col items-center">
            <Mail size={48} strokeWidth={1} style={{ color: accentColor }} className="mb-2" />
            <div className="w-16 h-px mt-2" style={{ backgroundColor: accentColor }} />
            <p className="mt-3 text-xs uppercase tracking-wider text-gray-700">Email</p>
          </div>

        
          <div className="flex flex-col items-center">
            <Smartphone size={48} strokeWidth={1} style={{ color: accentColor }} className="mb-2" />
            <div className="w-16 h-px mt-2" style={{ backgroundColor: accentColor }} />
            <p className="mt-3 text-xs uppercase tracking-wider text-gray-700">WhatsApp</p>
          </div>

      
          <div className="flex flex-col items-center">
            <MapPin size={48} strokeWidth={1} style={{ color: accentColor }} className="mb-2" />
            <div className="w-16 h-px mt-2" style={{ backgroundColor: accentColor }} />
            <p className="mt-3 text-xs uppercase tracking-wider text-gray-700">Locations</p>
          </div>
        </div>
      </section>

   
      <footer className="w-full text-center py-6 text-xs text-gray-400 border-t mt-12">
        &copy; {new Date().getFullYear()} KK Design. All Rights Reserved.
      </footer>
    </div>
  );
};

export default page;
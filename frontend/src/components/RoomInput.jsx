import React, { useContext, useState } from 'react'
import HandCricket from './HandCricket';
import { useNavigate } from 'react-router-dom';
const RoomInput = () => {
    const [id,setId] = useState('');
    const [isValid,setIsValid] = useState(true);
    const navigate = useNavigate();
    const handleInputChange = (event)=>{
      setId(event.target.value);
    }
    const handleSubmit = ()=>{
        navigate(`/hand-cricket/${id}`);
    }
  

    return (
<div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
  {/* Subtle Gaming Glow Effects */}
  <div className="absolute w-72 h-72 bg-blue-600 opacity-10 blur-3xl top-20 left-10"></div>
  <div className="absolute w-96 h-96 bg-purple-600 opacity-10 blur-3xl bottom-20 right-10"></div>
  
  {/* Abstract Gaming Pattern Overlay */}
  <div className="absolute inset-0 opacity-5 bg-repeat" 
       style={{
         backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjODA4MGZmIi8+PC9zdmc+')"
       }}></div>
       
  {/* Digital Circuit Lines - Gaming Effect */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
    <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
    <div className="absolute h-px bg-blue-400 w-full top-3/4 left-0 animate-pulse delay-700"></div>
    <div className="absolute w-px bg-purple-400 h-full left-1/4 top-0 animate-pulse"></div>
    <div className="absolute w-px bg-blue-400 h-full left-2/4 top-0 animate-pulse delay-300"></div>
    <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-700"></div>
  </div>

  {/* Form Container */}
  <div className="backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 p-6 max-w-md w-full relative z-10">
    <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 uppercase tracking-wider">Enter The Room Code</h1>
    
    <div className="space-y-4">
      <div className="relative">
        <input 
          type="text" 
          value={id} 
          onChange={handleInputChange} 
          className="w-full bg-gray-900/80 border-2 border-blue-500/40 focus:border-purple-500 rounded-md px-4 py-3 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
          placeholder="Enter code here..."
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md -z-10 blur-sm"></div>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        <span className="relative z-10">Submit</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      </button>
    </div>
    
    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-6"></div>
  </div>
  
  {/* Modern Gaming Corner Accents */}
  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>
</div>

    );
}

export default RoomInput
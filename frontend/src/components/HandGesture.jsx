import React, { useEffect, useState } from 'react';

const HandGesture = ({ number, gameEvent }) => {
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if (number === undefined) return;
    
    const timer = setTimeout(() => {
      setShowNumber(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [number]);

  const getAuraColor = () => {
    switch (gameEvent) {
      case 'player_score':
        return 'from-blue-500/30 via-blue-400/50 to-blue-500/30';
      case 'opponent_score':
        return 'from-orange-500/30 via-orange-400/50 to-orange-500/30';
      case 'out':
        return 'from-red-500/30 via-red-400/50 to-red-500/30';
      default:
        return 'from-purple-500/10 via-purple-400/30 to-purple-500/10';
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-[200px]">
      <div className="gaming-dice text-8xl transform transition-all duration-300">
        <div className="dice-face">
          {number !== undefined ? number : '?'}
        </div>
      </div>

      {/* Dynamic Aura Effect */}
      <div 
        className={`
          absolute
          inset-0
          bg-gradient-to-r
          ${getAuraColor()}
          blur-2xl
          transition-all
          duration-500
          animate-pulse
          opacity-${showNumber ? '100' : '0'}
        `}
      />

      <style jsx>{`
        .gaming-dice {
          position: relative;
          width: 100px;
          height: 100px;
          z-index: 10;
        }

        .dice-face {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border-radius: 16px;
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          color: white;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          border: 2px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default HandGesture;

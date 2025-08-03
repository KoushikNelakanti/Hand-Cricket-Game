import React, { useState, useEffect } from 'react';
import clickSound from '../assets/click.wav'

const NumberGrid = ({number, setNumber}) => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    const click = new Audio(clickSound);
    click.volume = 0.7;
    const handleNumberSelect = (num) => {
         click.play().catch((err) => {
    console.error("Click sound play error:", err);
  });
        setSelectedNumber(num);
        setShowAnimation(true);
        setNumber(num);
    };

    useEffect(() => {
        if (showAnimation) {
            const timer = setTimeout(() => setShowAnimation(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAnimation]);

    return (
        <div className="relative p-8 backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10">
            {/* Display Box for Animation */}
            <div className="mb-8 h-24 relative overflow-hidden rounded-lg backdrop-blur-md bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 shadow-lg shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md -z-10 blur-sm"></div>
                {showAnimation && selectedNumber && (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-bounce transition-all duration-300">
                            {selectedNumber}
                        </span>
                    </div>
                )}
                {!showAnimation && (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400/50 to-purple-500/50">Choose a number</span>
                    </div>
                )}
            </div>

            {/* Number Grid */}
            <div className="grid grid-cols-5 gap-4">
                {numbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberSelect(num)}
                        disabled={number !== 0}
                        className={`
                            relative overflow-hidden
                            w-16 h-16 
                            bg-gradient-to-r from-blue-600 to-purple-600
                            hover:from-blue-700 hover:to-purple-700
                            text-white
                            rounded-lg 
                            border 
                            border-blue-500/20 
                            hover:border-purple-400/50 
                            transition-all 
                            duration-300 
                            shadow-lg
                            hover:shadow-purple-500/50
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            disabled:hover:from-blue-600
                            disabled:hover:to-purple-600
                            disabled:hover:border-blue-500/20
                            disabled:hover:shadow-none
                            text-xl
                            font-bold
                            group
                            transform
                            hover:-translate-y-0.5
                        `}
                    >
                        <span className="relative z-10">{num}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    </button>
                ))}
            </div>

            {/* Digital Circuit Lines - Gaming Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
                <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
                <div className="absolute w-px bg-blue-400 h-full left-1/4 top-0 animate-pulse"></div>
                <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-300"></div>
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-xl"></div>
            <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-br-xl"></div>
        </div>
    );
};

export default NumberGrid;

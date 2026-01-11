
import React, { useEffect, useState } from 'react';
import { PlayerStats } from '../types';
import { Skull, RefreshCw, Home } from 'lucide-react';

interface GameOverScreenProps {
  stats: PlayerStats;
  onRetry: () => void;
  onMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ stats, onRetry, onMenu }) => {
  const [stampVisible, setStampVisible] = useState(false);

  useEffect(() => {
    // Delay stamp effect for drama
    setTimeout(() => setStampVisible(true), 500);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm font-sans overflow-hidden">
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="relative w-full max-w-3xl p-4">
        {/* Main Card */}
        <div className="bg-[#f3f4f6] border-[6px] border-[#1a1a1a] neo-shadow p-8 md:p-12 relative transform rotate-1">
          
          {/* Decorative Corner Screws */}
          <div className="absolute top-4 left-4 text-2xl text-gray-400">x</div>
          <div className="absolute top-4 right-4 text-2xl text-gray-400">x</div>
          <div className="absolute bottom-4 left-4 text-2xl text-gray-400">x</div>
          <div className="absolute bottom-4 right-4 text-2xl text-gray-400">x</div>

          {/* STAMP EFFECT */}
          <div className={`
             absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             border-[8px] border-red-600 text-red-600 px-8 py-4 
             text-6xl md:text-8xl font-black uppercase tracking-tighter 
             transform -rotate-12 z-20 pointer-events-none mix-blend-multiply
             transition-all duration-300 ease-in
             ${stampVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-150'}
          `}>
             THẤT BẠI
          </div>

          <div className="text-center mb-10 relative z-10">
            <Skull className="w-16 h-16 mx-auto mb-4 text-[#1a1a1a]" strokeWidth={2.5} />
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-2">
              NHIỆM VỤ<br/>KẾT THÚC
            </h1>
            <div className="h-1 w-24 bg-black mx-auto mt-4"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
             <div className="bg-white border-4 border-black p-4 text-center hover:bg-yellow-50 transition-colors">
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Kẻ Địch Đã Diệt</div>
                <div className="text-4xl md:text-5xl font-black text-red-600">{stats.kills}</div>
             </div>
             <div className="bg-white border-4 border-black p-4 text-center hover:bg-blue-50 transition-colors">
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Cấp Độ Đạt Được</div>
                <div className="text-4xl md:text-5xl font-black text-black">{stats.level}</div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 relative z-10">
            <button 
              onClick={onRetry}
              className="flex-1 bg-black text-white py-4 px-6 border-4 border-black font-black text-lg uppercase flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] transition-all"
            >
              <RefreshCw size={24} strokeWidth={3} /> Thử Lại
            </button>
            <button 
              onClick={onMenu}
              className="flex-1 bg-white text-black py-4 px-6 border-4 border-black font-black text-lg uppercase flex items-center justify-center gap-3 hover:-translate-y-1 hover:bg-gray-100 transition-all"
            >
               <Home size={24} strokeWidth={3} /> Về Menu
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;


import React, { useEffect, useState } from 'react';
import { PlayerStats } from '../types';
import { Trophy, RefreshCw, Home, Star, Crown } from 'lucide-react';

interface VictoryScreenProps {
  stats: PlayerStats;
  onRetry: () => void;
  onMenu: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ stats, onRetry, onMenu }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-yellow-500/90 backdrop-blur-sm font-sans overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0" style={{ 
             backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)' 
         }}></div>
      </div>

      {/* Confetti / Sparkles (CSS simplified) */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute animate-bounce" style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random()}s`,
                  opacity: 0.6
              }}>
                  <Star size={Math.random() * 30 + 10} fill={Math.random() > 0.5 ? 'white' : 'black'} className="animate-spin" />
              </div>
           ))}
        </div>
      )}

      <div className="relative w-full max-w-4xl p-4 animate-pop">
        {/* Main Card */}
        <div className="bg-white border-[8px] border-black neo-shadow p-8 md:p-12 relative flex flex-col items-center">
          
          {/* Top Badge */}
          <div className="absolute -top-12 bg-black text-yellow-400 p-6 rounded-full border-8 border-white neo-shadow-sm transform rotate-12">
             <Crown size={64} strokeWidth={2} fill="currentColor" />
          </div>

          <div className="mt-8 text-center mb-8">
            <h2 className="text-xl font-black text-gray-500 uppercase tracking-[0.5em] mb-2">SỨ MỆNH HOÀN THÀNH</h2>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-black drop-shadow-[4px_4px_0_rgba(234,179,8,1)]">
              CHIẾN THẮNG
            </h1>
            <p className="font-mono font-bold text-lg mt-4 bg-yellow-400 inline-block px-4 py-1 border-2 border-black transform -rotate-1">
              BẠN ĐÃ BẢO VỆ ĐƯỢC TƯ TƯỞNG!
            </p>
          </div>

          {/* Stats Showcase */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
             <div className="bg-black text-white p-4 border-4 border-black text-center flex flex-col items-center justify-center">
                <Trophy className="text-yellow-400 mb-2" size={32} />
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kẻ Địch Đã Diệt</div>
                <div className="text-4xl font-black">{stats.kills}</div>
             </div>
             
             <div className="bg-white text-black p-4 border-4 border-black text-center flex flex-col items-center justify-center neo-shadow-sm">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cấp Độ Cuối</div>
                <div className="text-5xl font-black">{stats.level}</div>
             </div>

             <div className="bg-yellow-400 text-black p-4 border-4 border-black text-center flex flex-col items-center justify-center">
                 <div className="text-xs font-bold text-black/60 uppercase tracking-widest">Danh Hiệu</div>
                 <div className="text-xl font-black uppercase italic leading-tight">
                    {stats.kills > 2000 ? "THẦN CHIẾN TRANH" : stats.level > 30 ? "BẬC THẦY" : "CHIẾN BINH"}
                 </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <button 
              onClick={onRetry}
              className="flex-1 bg-black text-white py-4 px-6 border-4 border-black font-black text-lg uppercase flex items-center justify-center gap-3 hover:-translate-y-1 hover:bg-gray-800 transition-all shadow-[8px_8px_0_0_#ca8a04]"
            >
              <RefreshCw size={24} strokeWidth={3} /> Chơi Lại
            </button>
            <button 
              onClick={onMenu}
              className="flex-1 bg-white text-black py-4 px-6 border-4 border-black font-black text-lg uppercase flex items-center justify-center gap-3 hover:-translate-y-1 hover:bg-gray-50 transition-all hover:shadow-lg"
            >
               <Home size={24} strokeWidth={3} /> Về Menu
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;

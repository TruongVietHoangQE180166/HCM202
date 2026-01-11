
import React from 'react';
import { Play, BarChart2, BookOpen, ShieldCheck, Zap } from 'lucide-react';

interface MainMenuProps {
  onStart: () => void;
  onShowHistory: () => void;
  onShowTutorial: () => void;
  onShowPolicy: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onShowHistory, onShowTutorial, onShowPolicy }) => {
  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-[#f4f4f5] flex items-center justify-center font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="absolute top-0 left-0 w-full h-full" 
              style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
         </div>
      </div>
      <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-yellow-300 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-blue-300 rounded-full blur-[120px] opacity-30"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4">
        
        {/* HERO TITLE */}
        <div className="mb-16 text-center transform hover:scale-105 transition-transform duration-500">
           <div className="inline-block bg-black text-white px-4 py-1 mb-4 border-2 border-black neo-shadow-sm transform -rotate-2">
              <span className="font-mono font-bold tracking-[0.3em] text-xs md:text-sm">PHIÊN BẢN CÁCH MẠNG 2.1</span>
           </div>
           <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)]">
             HÀNH TRÌNH<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">TƯ TƯỞNG</span>
           </h1>
           <p className="mt-4 font-mono font-bold text-gray-500 tracking-widest text-sm md:text-base">SURVIVAL RPG • BULLET HEAVEN • HISTORY</p>
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          
          {/* PLAY BUTTON (Giant) */}
          <button 
            onClick={onStart}
            className="col-span-1 md:col-span-8 group relative h-40 bg-black text-white border-4 border-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative h-full flex items-center justify-between px-8 md:px-12">
               <div className="flex flex-col items-start">
                 <span className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase group-hover:translate-x-2 transition-transform">CHIẾN ĐẤU</span>
                 <span className="text-xs md:text-sm font-mono font-bold text-gray-400 group-hover:text-white mt-1">BẮT ĐẦU CHIẾN DỊCH MỚI</span>
               </div>
               <div className="bg-white text-black p-4 rounded-full border-4 border-black group-hover:scale-110 group-hover:rotate-12 transition-transform">
                 <Play size={40} fill="currentColor" />
               </div>
            </div>
          </button>

          {/* SIDE BUTTONS */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4 h-40">
             <button 
               onClick={onShowHistory}
               className="flex-1 bg-white text-black border-4 border-black neo-shadow hover:bg-yellow-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 font-black uppercase text-lg"
             >
               <BarChart2 size={24} strokeWidth={3} /> Lịch Sử
             </button>
             <button 
               onClick={onShowTutorial}
               className="flex-1 bg-white text-black border-4 border-black neo-shadow hover:bg-blue-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 font-black uppercase text-lg"
             >
               <BookOpen size={24} strokeWidth={3} /> Hướng Dẫn
             </button>
          </div>

          {/* FOOTER BUTTONS */}
          <button 
            onClick={onShowPolicy}
            className="col-span-1 md:col-span-12 py-3 bg-gray-200 text-gray-600 font-mono font-bold text-xs border-2 border-transparent hover:border-gray-400 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck size={14} /> CAM KẾT SỬ DỤNG AI & BẢO MẬT DỮ LIỆU
          </button>

        </div>
      </div>
      
      {/* Version Tag */}
      <div className="absolute bottom-4 left-4 font-mono text-xs font-bold text-gray-400 opacity-50">
        BUILD: v2.1.0_PROD
      </div>
    </div>
  );
};

export default MainMenu;


import React from 'react';
import { Buff, Rarity } from '../types';
import { 
  Crosshair, BookOpen, Zap, Flame, Heart, Shield, 
  ChevronsRight, Sparkles, ArrowUpCircle, Check 
} from 'lucide-react';

interface LevelUpModalProps {
  options: Buff[];
  onSelect: (buff: Buff) => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ options, onSelect }) => {
  
  // Helper to determine styling based on Rarity
  const getRarityStyles = (rarity: Rarity) => {
    switch (rarity) {
      case Rarity.COMMON: 
        return { 
          border: 'border-gray-500', 
          bg: 'bg-white', 
          headerBg: 'bg-gray-200',
          text: 'text-gray-700',
          accent: 'text-gray-500',
          shadow: 'shadow-gray-900'
        };
      case Rarity.UNCOMMON: 
        return { 
          border: 'border-green-600', 
          bg: 'bg-green-50', 
          headerBg: 'bg-green-200',
          text: 'text-green-800',
          accent: 'text-green-600',
          shadow: 'shadow-green-900'
        };
      case Rarity.RARE: 
        return { 
          border: 'border-blue-600', 
          bg: 'bg-blue-50', 
          headerBg: 'bg-blue-200',
          text: 'text-blue-800',
          accent: 'text-blue-600',
          shadow: 'shadow-blue-900'
        };
      case Rarity.EPIC: 
        return { 
          border: 'border-yellow-600', 
          bg: 'bg-yellow-50', 
          headerBg: 'bg-yellow-200',
          text: 'text-yellow-800',
          accent: 'text-yellow-600',
          shadow: 'shadow-yellow-900'
        };
      case Rarity.LEGENDARY: 
        return { 
          border: 'border-purple-600', 
          bg: 'bg-purple-50', 
          headerBg: 'bg-purple-200',
          text: 'text-purple-800',
          accent: 'text-purple-600',
          shadow: 'shadow-purple-900'
        };
      case Rarity.MYTHIC: 
        return { 
          border: 'border-orange-600', 
          bg: 'bg-orange-50', 
          headerBg: 'bg-orange-200',
          text: 'text-orange-800',
          accent: 'text-orange-600',
          shadow: 'shadow-orange-900'
        };
      case Rarity.GODLY: 
        return { 
          border: 'border-red-600', 
          bg: 'bg-red-50', 
          headerBg: 'bg-red-200',
          text: 'text-red-800',
          accent: 'text-red-600',
          shadow: 'shadow-red-900'
        };
      default: 
        return { 
          border: 'border-black', 
          bg: 'bg-white', 
          headerBg: 'bg-gray-200',
          text: 'text-black',
          accent: 'text-black',
          shadow: 'shadow-black'
        };
    }
  };

  const getRarityLabel = (rarity: Rarity) => {
    switch(rarity) {
        case Rarity.COMMON: return 'THƯỜNG';
        case Rarity.UNCOMMON: return 'KHÁ';
        case Rarity.RARE: return 'HIẾM';
        case Rarity.EPIC: return 'CỰC HIẾM';
        case Rarity.LEGENDARY: return 'HUYỀN THOẠI';
        case Rarity.MYTHIC: return 'THẦN THOẠI';
        case Rarity.GODLY: return 'THƯỢNG CỔ';
    }
  }

  // Helper to choose the correct icon based on buff type or content
  const renderIcon = (buff: Buff, className: string) => {
      // 1. Check explicit type
      if (buff.type === 'GUN_BUFF') return <Crosshair className={className} strokeWidth={1.5} />;
      if (buff.type === 'BOOK_BUFF') return <BookOpen className={className} strokeWidth={1.5} />;
      if (buff.type === 'LIGHTNING_BUFF') return <Zap className={className} strokeWidth={1.5} />;
      if (buff.type === 'NOVA_BUFF') return <Flame className={className} strokeWidth={1.5} />;
      
      // 2. Check description for STAT_BUFF specifics
      const lowerName = buff.name.toLowerCase();
      const lowerDesc = buff.description.toLowerCase();

      if (lowerDesc.includes('hồi máu') || lowerName.includes('trái tim')) return <Heart className={className} strokeWidth={1.5} />;
      if (lowerDesc.includes('giáp') || lowerDesc.includes('khiên')) return <Shield className={className} strokeWidth={1.5} />;
      if (lowerDesc.includes('tốc độ') || lowerName.includes('giày')) return <ChevronsRight className={className} strokeWidth={1.5} />;
      
      // Default
      return <ArrowUpCircle className={className} strokeWidth={1.5} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 font-sans">
      
      {/* Main Header */}
      <div className="mb-10 text-center animate-pop relative">
         {/* Decorative sparkles */}
         <Sparkles className="absolute -top-8 -left-12 text-yellow-400 w-12 h-12 animate-pulse" />
         <Sparkles className="absolute -bottom-4 -right-12 text-yellow-400 w-8 h-8 animate-pulse" style={{ animationDelay: '0.5s' }} />
         
         <h1 className="text-6xl md:text-8xl font-black italic uppercase text-white drop-shadow-[6px_6px_0_#000] tracking-tighter leading-none">
           <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">LÊN CẤP!</span>
         </h1>
         <div className="bg-white text-black px-6 py-2 inline-block font-mono font-bold uppercase tracking-widest border-4 border-black neo-shadow transform -rotate-2 mt-4 text-sm md:text-base">
           Chọn một phần thưởng
         </div>
      </div>
        
      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-7xl items-stretch">
        {options.map((buff, idx) => {
          const style = getRarityStyles(buff.rarity);
          return (
            <div
              key={idx}
              onClick={() => onSelect(buff)}
              className={`
                group relative w-[300px] cursor-pointer flex flex-col
                bg-white rounded-2xl overflow-hidden
                border-[4px] ${style.border}
                transition-all duration-300 ease-out
                hover:-translate-y-4 hover:scale-105 hover:z-10
                hover:shadow-[0_20px_0_0_rgba(0,0,0,0.3)]
              `}
            >
              {/* Card Header (Rarity) */}
              <div className={`
                 py-3 px-4 flex justify-between items-center border-b-4 ${style.border} ${style.headerBg}
              `}>
                 <span className={`font-black text-xs uppercase tracking-[0.2em] ${style.text}`}>
                    {getRarityLabel(buff.rarity)}
                 </span>
                 <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${style.bg} border border-black`}></div>
                    ))}
                 </div>
              </div>

              {/* Card Body (Icon) */}
              <div className={`
                 flex-1 py-8 px-6 flex flex-col items-center justify-center relative overflow-hidden ${style.bg}
              `}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10" 
                       style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                  </div>
                  
                  {/* Glowing Circle behind Icon */}
                  <div className={`
                     w-32 h-32 rounded-full flex items-center justify-center mb-6
                     bg-white border-4 ${style.border} shadow-lg relative
                     group-hover:scale-110 transition-transform duration-500
                  `}>
                     {renderIcon(buff, `w-16 h-16 ${style.accent}`)}
                     
                     {/* Orbiting particle for effect */}
                     <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 animate-[spin_10s_linear_infinite] opacity-50"></div>
                  </div>

                  {/* Title & Desc */}
                  <div className="text-center relative z-10">
                     <h3 className={`text-xl font-black uppercase italic leading-none mb-3 text-black`}>
                       {buff.name}
                     </h3>
                     <p className="text-sm font-medium text-gray-600 leading-relaxed font-mono">
                       {buff.description}
                     </p>
                  </div>
              </div>

              {/* Card Footer (Button) */}
              <div className={`p-4 bg-white border-t-4 ${style.border}`}>
                 <div className={`
                    w-full py-3 rounded-lg font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2
                    bg-black text-white group-hover:bg-gray-800 transition-all
                    border-2 border-transparent group-hover:border-black
                 `}>
                    <Check size={18} strokeWidth={4} />
                    CHỌN
                 </div>
              </div>

              {/* Shine Effect Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out pointer-events-none"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelUpModal;

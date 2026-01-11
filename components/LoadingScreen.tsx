
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
}

const TIPS = [
  "Mẹo: Di chuyển liên tục để tránh bị bao vây.",
  "Mẹo: Sách Phép rất mạnh khi đối đầu với đám đông.",
  "Mẹo: Trả lời đúng câu hỏi để nhận Buff, sai chỉ được hồi máu.",
  "Mẹo: Boss xuất hiện mỗi 2 phút, hãy chuẩn bị!",
  "Kiến thức: Bác Hồ ra đi tìm đường cứu nước năm 1911.",
  "Kiến thức: Độc lập - Tự do - Hạnh phúc."
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);

  return (
    <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-yellow-400 overflow-hidden font-mono">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 20px, transparent 20px, transparent 40px)' }}>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white border-4 border-black neo-shadow transform -rotate-1">
        <h2 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">ĐANG TẢI...</h2>
        
        <div className="flex justify-between text-xs font-bold mb-2">
          <span>SYSTEM_INIT</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        
        {/* Glitchy Progress Bar */}
        <div className="h-6 w-full border-4 border-black p-1 bg-gray-200">
          <div 
            className="h-full bg-black transition-all duration-100 ease-out relative overflow-hidden" 
            style={{ width: `${progress}%` }}
          >
             <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1s infinite' }}></div>
          </div>
        </div>

        <div className="mt-6 border-t-2 border-black pt-4">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">DỮ LIỆU TÌNH BÁO:</p>
          <p className="text-lg font-bold leading-tight min-h-[3.5rem]">{tip}</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 font-black text-6xl text-black opacity-10 pointer-events-none">
        LOADING
      </div>
    </div>
  );
};

export default LoadingScreen;

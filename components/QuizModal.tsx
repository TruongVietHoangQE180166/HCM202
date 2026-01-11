
import React, { useState, useEffect } from 'react';
import { Question, Buff } from '../types';
import { Clock, HelpCircle } from 'lucide-react';

interface QuizModalProps {
  question: Question;
  selectedBuff: Buff;
  onAnswer: (correct: boolean) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ question, selectedBuff, onAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [answered, setAnswered] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      onAnswer(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onAnswer]);

  const handleChoice = (index: number) => {
    if (answered !== null) return;
    setAnswered(index);
    setTimeout(() => {
      onAnswer(index === question.correctIndex);
    }, 1000); // Slightly longer delay to see the result
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-sans">
      <div className="max-w-4xl w-full bg-white border-[6px] border-black neo-shadow flex flex-col overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="bg-[#1a1a1a] text-white px-6 py-4 flex justify-between items-center border-b-4 border-black">
          <div className="flex items-center gap-2">
             <HelpCircle className="text-yellow-400" />
             <span className="font-bold uppercase tracking-widest text-sm text-gray-400">CHỦ ĐỀ:</span>
             <span className="font-black uppercase text-yellow-400">{question.topic}</span>
          </div>
          
          <div className="flex items-center gap-3">
             <Clock size={20} className={timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'} />
             <div className="w-48 h-4 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-500">
                <div 
                   className={`h-full transition-all duration-1000 linear ${timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'}`}
                   style={{ width: `${(timeLeft / 20) * 100}%` }}
                ></div>
             </div>
             <span className="font-mono font-black w-8">{timeLeft}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 flex flex-col items-center text-center bg-gray-50 relative">
          
          {/* Reward Preview */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-1 rounded-b-lg font-bold text-xs uppercase tracking-widest border-x-2 border-b-2 border-black mb-8 shadow-sm">
             Phần thưởng: <span className="text-yellow-400 italic">{selectedBuff.name}</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-black leading-tight mt-6 mb-10 max-w-3xl">
            {question.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {question.options.map((opt, idx) => {
               
               let statusClass = "bg-white border-black text-black hover:bg-gray-100";
               
               if (answered !== null) {
                   if (idx === question.correctIndex) statusClass = "bg-green-500 border-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.6)] scale-105 z-10";
                   else if (idx === answered) statusClass = "bg-red-500 border-red-700 text-white opacity-100";
                   else statusClass = "bg-gray-200 border-gray-300 text-gray-400 opacity-50 grayscale";
               }

               return (
                <button
                  key={idx}
                  onClick={() => handleChoice(idx)}
                  className={`
                    relative p-6 text-left border-4 transition-all duration-200
                    flex items-center gap-4 group
                    ${answered === null ? 'hover:-translate-y-1 hover:shadow-md' : ''}
                    ${statusClass}
                  `}
                  disabled={answered !== null}
                >
                  <div className={`
                    w-10 h-10 flex items-center justify-center font-black border-2 rounded shrink-0
                    ${answered === idx && idx === question.correctIndex ? 'bg-white text-green-600 border-white' : 'bg-black text-white border-black'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-bold text-lg leading-snug">{opt}</span>
                  
                  {/* Result Icon */}
                  {answered !== null && idx === question.correctIndex && (
                     <div className="absolute right-4 text-2xl">✓</div>
                  )}
                  {answered === idx && idx !== question.correctIndex && (
                     <div className="absolute right-4 text-2xl">✕</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-200 p-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
           Trả lời đúng để nhận sức mạnh • Trả lời sai để hồi phục
        </div>
      </div>
    </div>
  );
};

export default QuizModal;


import React, { useState, useEffect } from 'react';
import { Question, Buff } from '../types';

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
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md p-4">
      <div className="max-w-3xl w-full bg-white border-4 border-black neo-shadow p-10 flex flex-col items-center">
        
        {/* Topic Header */}
        <div className="w-full flex justify-between items-center mb-10">
          <div className="bg-[oklch(0.5635_0.2408_260.8178)] text-white px-4 py-1 border-2 border-black font-black text-[10px] uppercase tracking-widest">
            {question.topic}
          </div>
          <div className={`
            font-mono font-black text-xl px-4 py-1 border-2 border-black neo-shadow-sm
            ${timeLeft < 5 ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-black'}
          `}>
            {timeLeft}s
          </div>
        </div>

        {/* Buff Context */}
        <div className="mb-8 w-full border-b-4 border-black pb-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Thử thách để nhận:</p>
          <h2 className="text-2xl font-black italic text-[oklch(0.6489_0.2370_26.9728)]">{selectedBuff.name}</h2>
        </div>

        {/* Question Area */}
        <div className="mb-10 w-full">
          <h3 className="text-2xl font-black leading-tight text-center">
            "{question.question}"
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(idx)}
              className={`
                p-6 text-sm font-bold text-left border-4 transition-all duration-100
                ${answered === null 
                  ? 'bg-white border-black hover:-translate-y-1 hover:-translate-x-1 hover:neo-shadow' 
                  : ''}
                ${answered === idx && idx === question.correctIndex ? 'bg-green-400 border-black neo-shadow-sm' : ''}
                ${answered === idx && idx !== question.correctIndex ? 'bg-red-400 border-black neo-shadow-sm' : ''}
                ${answered !== null && idx === question.correctIndex ? 'bg-green-400 border-black' : ''}
                ${answered !== null && idx !== answered && idx !== question.correctIndex ? 'opacity-40 grayscale border-black' : ''}
              `}
              disabled={answered !== null}
            >
              <span className="inline-block w-8 h-8 bg-black text-white text-center leading-8 font-black mr-4 transform -rotate-12">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>

        <p className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Vượt qua để rèn luyện bản lĩnh
        </p>
      </div>
    </div>
  );
};

export default QuizModal;

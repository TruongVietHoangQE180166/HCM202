
import React, { useState } from 'react';
import { User, Swords, X } from 'lucide-react';

interface NameInputModalProps {
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

const NameInputModal: React.FC<NameInputModalProps> = ({ onConfirm, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      onConfirm(name.trim().toUpperCase());
    }
  };

  return (
    <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white border-4 border-black neo-shadow w-full max-w-md p-8 animate-pop relative">
        
        <button 
            onClick={onCancel}
            className="absolute top-4 right-4 hover:bg-gray-200 p-1 transition-colors"
        >
            <X size={24} />
        </button>

        <h2 className="text-3xl font-black uppercase italic mb-6 text-center">ĐĂNG KÝ THAM CHIẾN</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Tên Chiến Binh
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={12}
                        placeholder="NHẬP TÊN CỦA BẠN..."
                        className="w-full bg-gray-100 border-4 border-black py-4 pl-12 pr-4 font-mono font-bold text-xl uppercase focus:outline-none focus:bg-yellow-100 transition-colors"
                        autoFocus
                    />
                </div>
                <p className="text-xs text-gray-400 mt-2 font-mono text-right">MAX 12 CHARS</p>
            </div>

            <button 
                type="submit"
                disabled={name.trim().length === 0}
                className="bg-black text-white py-4 px-6 border-4 border-black font-black text-lg uppercase flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#ef4444] hover:bg-red-600 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-black"
            >
                <Swords size={24} /> VÀO TRẬN
            </button>
        </form>
      </div>
    </div>
  );
};

export default NameInputModal;

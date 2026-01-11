
import React from 'react';
import { X, FileText, Database } from 'lucide-react';
import { GameHistory } from '../types';

interface HistoryModalProps {
  history: GameHistory[];
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ history, onClose }) => {
  return (
    <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="bg-[#f3f4f6] w-full max-w-4xl h-[85vh] flex flex-col border-4 border-black neo-shadow relative overflow-hidden">
        
        {/* Decorative Tape */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 -rotate-45 transform translate-x-16 -translate-y-16 pointer-events-none"></div>

        {/* Header */}
        <div className="bg-[#1a1a1a] text-[#f3f4f6] px-6 py-4 flex justify-between items-center border-b-4 border-black shrink-0">
          <div className="flex items-center gap-3">
             <Database size={20} className="text-green-500" />
             <span className="font-bold tracking-widest uppercase text-lg">Hồ Sơ Chiến Đấu</span>
          </div>
          <button onClick={onClose} className="group flex items-center gap-2 hover:text-red-500 transition-colors">
            <span className="text-xs font-bold hidden group-hover:inline-block">ĐÓNG HỒ SƠ</span>
            <div className="bg-white text-black p-1 border-2 border-transparent group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
               <X size={20} />
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] flex-1">
          
          <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
             <div>
                <h2 className="text-4xl font-black uppercase italic text-black">LOGS_2024</h2>
                <p className="text-gray-500 text-sm font-bold mt-1">TỔNG HỢP KẾT QUẢ THỰC CHIẾN</p>
             </div>
             <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-gray-400 uppercase">TỔNG SỐ TRẬN</div>
                <div className="text-4xl font-black">{history.length}</div>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-black text-white text-sm uppercase tracking-wider">
                  <th className="p-4 border-b-4 border-black w-1/4">Thời Gian</th>
                  <th className="p-4 border-b-4 border-black w-1/4">Sống Sót</th>
                  <th className="p-4 border-b-4 border-black w-1/4">Cấp Độ</th>
                  <th className="p-4 border-b-4 border-black w-1/4 text-right">Kẻ Địch Diệt</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-gray-800">
                {history.map((h, i) => (
                  <tr key={h.id} className="hover:bg-yellow-100 transition-colors border-b-2 border-gray-300 group">
                    <td className="p-4 group-hover:text-black text-gray-600">{h.date}</td>
                    <td className="p-4 font-black text-lg">{h.timeSurvived}</td>
                    <td className="p-4">
                        <span className="bg-gray-200 px-2 py-1 rounded text-xs border border-gray-400 group-hover:bg-black group-hover:text-white transition-colors">LVL {h.level}</span>
                    </td>
                    <td className="p-4 text-right font-black text-red-600 text-lg">{h.kills}</td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400 border-2 border-dashed border-gray-300">
                       <FileText size={48} className="mx-auto mb-4 opacity-20" />
                       <p>CHƯA CÓ DỮ LIỆU. HÃY BẮT ĐẦU TRẬN ĐẤU ĐẦU TIÊN.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer Status */}
        <div className="bg-gray-200 px-4 py-2 text-xs font-bold text-gray-500 border-t-4 border-black flex justify-between">
           <span>LOCAL_STORAGE: CONNECTED</span>
           <span>SECURE LOGGING ENABLED</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;

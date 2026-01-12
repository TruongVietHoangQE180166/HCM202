
import React, { useEffect, useState, useCallback } from 'react';
import { X, Trophy, Skull, Clock, Medal, RefreshCw } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { fetchLeaderboard } from '../logic/supabaseClient';

interface LeaderboardModalProps {
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
      setLoading(true);
      const data = await fetchLeaderboard();
      setEntries(data);
      setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-[#f8fafc] border-4 border-black neo-shadow w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-pop">
        
        {/* Header */}
        <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center border-b-4 border-black shrink-0">
          <div className="flex items-center gap-3">
             <Trophy size={32} className="text-black" />
             <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black">BẢNG XẾP HẠNG</h2>
          </div>
          
          <div className="flex gap-2">
            <button 
                onClick={loadData} 
                disabled={loading}
                className="bg-white text-black p-2 border-2 border-black hover:bg-gray-100 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Làm mới dữ liệu"
            >
                <RefreshCw size={24} strokeWidth={3} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={onClose} className="bg-black text-white p-2 hover:bg-gray-800 transition-colors border-2 border-black">
                <X size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-0 bg-white">
          <table className="w-full text-left border-collapse">
             <thead className="bg-black text-white sticky top-0 z-10">
                <tr>
                    <th className="p-4 font-black uppercase text-sm w-16 text-center">#</th>
                    <th className="p-4 font-black uppercase text-sm">Tên</th>
                    <th className="p-4 font-black uppercase text-sm text-center"><Clock size={16} className="inline mr-1"/> Thời Gian</th>
                    <th className="p-4 font-black uppercase text-sm text-center">Level</th>
                    <th className="p-4 font-black uppercase text-sm text-center"><Skull size={16} className="inline mr-1"/> Kills</th>
                </tr>
             </thead>
             <tbody className="font-mono text-sm font-bold">
                {loading ? (
                    <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-500">ĐANG TẢI DỮ LIỆU TỪ MÁY CHỦ...</td>
                    </tr>
                ) : entries.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-500">CHƯA CÓ DỮ LIỆU HOẶC LỖI KẾT NỐI</td>
                    </tr>
                ) : (
                    entries.map((entry, index) => {
                        let rowClass = "border-b border-gray-200 hover:bg-gray-50";
                        let rankIcon = <span className="text-gray-500">#{index + 1}</span>;
                        
                        if (index === 0) {
                            rowClass = "bg-yellow-50 hover:bg-yellow-100 border-b-2 border-yellow-200";
                            rankIcon = <Medal className="mx-auto text-yellow-500" fill="currentColor" />;
                        } else if (index === 1) {
                            rowClass = "bg-gray-50 hover:bg-gray-100 border-b border-gray-200";
                            rankIcon = <Medal className="mx-auto text-gray-400" fill="currentColor" />;
                        } else if (index === 2) {
                            rowClass = "bg-orange-50 hover:bg-orange-100 border-b border-orange-200";
                            rankIcon = <Medal className="mx-auto text-orange-600" fill="currentColor" />;
                        }

                        return (
                            <tr key={entry.id || index} className={rowClass}>
                                <td className="p-4 text-center text-lg">{rankIcon}</td>
                                <td className="p-4 font-sans font-black text-lg uppercase">{entry.name}</td>
                                <td className="p-4 text-center font-black text-xl text-blue-600">{formatTime(entry.time_survived)}</td>
                                <td className="p-4 text-center"><span className="bg-gray-200 px-2 py-1 rounded text-xs">LV {entry.level}</span></td>
                                <td className="p-4 text-center text-red-600">{entry.kills}</td>
                            </tr>
                        );
                    })
                )}
             </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 border-t-4 border-black text-center text-xs font-bold text-gray-500 uppercase">
            Rank tính theo thời gian sống sót lâu nhất
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;

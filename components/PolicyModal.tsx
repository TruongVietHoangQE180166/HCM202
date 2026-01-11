
import React from 'react';
import { X, Terminal, CheckCircle2 } from 'lucide-react';

interface PolicyModalProps {
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="bg-[#0c0c0c] border-2 border-gray-700 w-full max-w-2xl shadow-2xl flex flex-col">
        
        {/* Terminal Header */}
        <div className="bg-[#1f1f1f] px-4 py-2 flex justify-between items-center border-b border-gray-700">
           <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Terminal size={14} />
              <span>user@system:~/privacy-policy</span>
           </div>
           <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" onClick={onClose}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
           </div>
        </div>

        {/* Content */}
        <div className="p-8 text-gray-300 text-sm leading-relaxed overflow-y-auto max-h-[70vh]">
           <div className="mb-6">
              <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> cat <span className="text-yellow-300">cam-ket-su-dung.txt</span>
           </div>

           <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-gray-800 pb-2">
             CAM KẾT SỬ DỤNG AI & BẢO MẬT
           </h2>

           <div className="space-y-6">
              <div className="flex gap-4">
                 <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                 <div>
                    <h3 className="font-bold text-white mb-1">1. Sử Dụng Công Nghệ AI</h3>
                    <p className="text-gray-400">
                      Trò chơi sử dụng các mô hình ngôn ngữ lớn (LLM) để tạo ra các câu hỏi trắc nghiệm, lời thoại và mô tả kỹ năng một cách ngẫu nhiên, giúp tăng tính đa dạng cho trải nghiệm.
                    </p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                 <div>
                    <h3 className="font-bold text-white mb-1">2. Bảo Mật Dữ Liệu (Local Storage)</h3>
                    <p className="text-gray-400">
                      Chúng tôi cam kết <strong>KHÔNG</strong> thu thập, lưu trữ hay chia sẻ bất kỳ thông tin cá nhân nào của bạn lên máy chủ. Mọi dữ liệu như: Lịch sử đấu, Cài đặt, Tiến trình đều được lưu trữ cục bộ ngay trên trình duyệt của bạn.
                    </p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                 <div>
                    <h3 className="font-bold text-white mb-1">3. Trách Nhiệm Nội Dung</h3>
                    <p className="text-gray-400">
                      Nội dung lịch sử và tư tưởng Hồ Chí Minh được biên tập cẩn thận. Tuy nhiên, AI có thể có sai sót nhỏ. Chúng tôi luôn hoan nghênh đóng góp ý kiến để hoàn thiện.
                    </p>
                 </div>
              </div>
           </div>

           <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-green-600 hover:bg-green-500 text-black font-bold px-6 py-2 uppercase tracking-wider transition-colors"
              >
                [ CHẤP NHẬN & ĐÓNG ]
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PolicyModal;

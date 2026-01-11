
import React from 'react';
import { X, MousePointer2 } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

const KeyCap = ({ char }: { char: string }) => (
  <div className="w-14 h-14 bg-white border-b-8 border-r-4 border-2 border-gray-300 border-b-gray-400 border-r-gray-400 rounded-lg flex items-center justify-center font-black text-xl text-gray-700 shadow-sm active:translate-y-1 active:border-b-2 transition-all">
    {char}
  </div>
);

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-[100] bg-[#e5e5e5]/90 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white border-4 border-black neo-shadow w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center border-b-4 border-black shrink-0">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">HƯỚNG DẪN SINH TỒN</h2>
          <button onClick={onClose} className="w-10 h-10 bg-black flex items-center justify-center hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* CONTROLS SECTION */}
            <section>
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-black text-white px-3 py-1 font-black text-sm uppercase skew-x-[-10deg]">01. Điều Khiển</div>
                 <div className="h-1 bg-black flex-1"></div>
               </div>
               
               <div className="bg-gray-200 rounded-xl p-8 border-4 border-gray-300 flex flex-col items-center gap-6 mb-6">
                  <div className="flex flex-col items-center gap-2">
                     <KeyCap char="W" />
                     <div className="flex gap-2">
                        <KeyCap char="A" />
                        <KeyCap char="S" />
                        <KeyCap char="D" />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-sm">
                     <MousePointer2 size={16} /> hoặc dùng chuột để chọn nâng cấp
                  </div>
               </div>
               
               <p className="font-medium text-gray-600 leading-relaxed text-justify">
                 Sử dụng các phím điều hướng để di chuyển nhân vật tránh né quái vật. Nhân vật sẽ <strong>tự động tấn công</strong> kẻ địch gần nhất.
               </p>
            </section>

            {/* MECHANICS SECTION */}
            <section>
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-black text-white px-3 py-1 font-black text-sm uppercase skew-x-[-10deg]">02. Cơ Chế</div>
                 <div className="h-1 bg-black flex-1"></div>
               </div>

               <div className="space-y-4">
                  {/* Card 1 */}
                  <div className="bg-white border-l-8 border-yellow-400 p-4 shadow-sm hover:shadow-md transition-shadow">
                     <h4 className="font-black text-lg mb-1 flex items-center gap-2">
                        <span className="text-2xl">💎</span> THU THẬP KINH NGHIỆM
                     </h4>
                     <p className="text-sm text-gray-600">Diệt quái rơi ra ngọc kinh nghiệm. Thu thập đủ để lên cấp và chọn kỹ năng mới.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white border-l-8 border-red-500 p-4 shadow-sm hover:shadow-md transition-shadow">
                     <h4 className="font-black text-lg mb-1 flex items-center gap-2">
                        <span className="text-2xl">⭕</span> VÒNG BO TỬ THẦN
                     </h4>
                     <p className="text-sm text-gray-600">Khi Boss xuất hiện hoặc đạt mốc thời gian, vòng bo sẽ thu hẹp. Ở ngoài vòng bo sẽ mất máu liên tục.</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white border-l-8 border-blue-500 p-4 shadow-sm hover:shadow-md transition-shadow">
                     <h4 className="font-black text-lg mb-1 flex items-center gap-2">
                        <span className="text-2xl">🛡️</span> KHIÊN NĂNG LƯỢNG
                     </h4>
                     <p className="text-sm text-gray-600">Bạn có lớp giáp ảo hồi phục theo thời gian. Nó đỡ sát thương trước khi tính vào máu thật.</p>
                  </div>
               </div>
            </section>

          </div>
          
          {/* Footer Note */}
          <div className="mt-12 p-6 bg-black text-white rounded-lg text-center font-mono text-sm border-4 border-gray-600 border-dashed">
             MỤC TIÊU: SỐNG SÓT CÀNG LÂU CÀNG TỐT & ĐÁNH BẠI 3 CON TRÙM.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;

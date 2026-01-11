
import { Rarity, Buff, Question } from './types';

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export const BUFFS: Buff[] = [
  // --- STAT BUFFS (GLOBAL) ---
  {
    id: 'hp_common',
    name: 'Bánh Mì (Thường)',
    description: 'Hồi 20 HP & +20 Max HP',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 20, hp: Math.min(s.maxHP + 20, s.hp + 20) })
  },
  {
    id: 'spd_uncommon',
    name: 'Giày Vải (Lạ)',
    description: '+10% Tốc độ di chuyển',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.1 })
  },
  {
    id: 'armor_rare',
    name: 'Áo Giáp Sắt (Hiếm)',
    description: '+2 Giáp vĩnh viễn',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 2 })
  },

  // --- GUN BUFFS ---
  {
    id: 'gun_dmg_common',
    name: 'Đạn Chì',
    description: '+10% Sát thương Súng',
    rarity: Rarity.COMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.1 })
  },
  {
    id: 'gun_amount_rare',
    name: 'Nòng Kép',
    description: '+1 Số lượng đạn bắn ra',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 1 })
  },
  {
    id: 'gun_pierce_epic',
    name: 'Đạn Xuyên Phá',
    description: '+1 Đạn xuyên thấu & +20% Sát thương',
    rarity: Rarity.EPIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunPierce: s.gunPierce + 1, gunDamageMult: s.gunDamageMult + 0.2 })
  },
  {
    id: 'gun_godly',
    name: 'HỎA THẦN CÔNG',
    description: '+3 Đạn, +50% Tốc độ bắn (GODLY)',
    rarity: Rarity.GODLY,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 3, gunCooldownMult: s.gunCooldownMult * 0.5 })
  },

  // --- BOOK BUFFS ---
  {
    id: 'book_spd_common',
    name: 'Sách Nhẹ',
    description: '+10% Tốc độ xoay của Sách',
    rarity: Rarity.COMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookSpeed: s.bookSpeed * 1.1 })
  },
  {
    id: 'book_area_uncommon',
    name: 'Khổ Giấy Lớn',
    description: '+15% Kích thước Sách',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookArea: s.bookArea + 0.15 })
  },
  {
    id: 'book_amount_legendary',
    name: 'Thư Viện Di Động',
    description: '+2 Quyển sách xoay quanh',
    rarity: Rarity.LEGENDARY,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 2 })
  },
  {
    id: 'book_mythic',
    name: 'TRI THỨC VÔ TẬN',
    description: '+1 Sách, +50% Kích thước, +50% Sát thương',
    rarity: Rarity.MYTHIC,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 1, bookArea: s.bookArea + 0.5, bookDamageMult: s.bookDamageMult + 0.5 })
  },

  // --- LIGHTNING BUFFS ---
  {
    id: 'lightning_unlock',
    name: 'Triệu Hồi Sấm Sét',
    description: 'Mở khóa / +1 Tia sét đánh ngẫu nhiên',
    rarity: Rarity.RARE,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 1 })
  },
  {
    id: 'lightning_dmg',
    name: 'Điện Áp Cao',
    description: '+20% Sát thương Sấm Sét',
    rarity: Rarity.UNCOMMON,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.2 })
  },
  {
    id: 'lightning_area',
    name: 'Bão Từ Trường',
    description: '+25% Phạm vi nổ của Sét',
    rarity: Rarity.EPIC,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningArea: s.lightningArea + 0.25 })
  },
  {
    id: 'lightning_godly',
    name: 'THẦN SẤM THOR',
    description: '+2 Tia sét, -20% Hồi chiêu (GODLY)',
    rarity: Rarity.GODLY,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 2, lightningCooldownMult: s.lightningCooldownMult * 0.8 })
  },

  // --- LOTUS BUFFS (NEW) ---
  {
    id: 'lotus_unlock',
    name: 'LIÊN HOA NỘ',
    description: 'Mở khóa: Đóa sen phát nổ & 4 cánh hoa truy kích',
    rarity: Rarity.RARE,
    type: 'LOTUS_BUFF',
    effect: (s) => ({ ...s, lotusAmount: s.lotusAmount + 4 }) // Starts with 4 petals
  },
  {
    id: 'lotus_area',
    name: 'Đài Sen Lớn',
    description: '+25% Phạm vi nổ của Sen',
    rarity: Rarity.UNCOMMON,
    type: 'LOTUS_BUFF',
    effect: (s) => ({ ...s, lotusArea: s.lotusArea + 0.25 })
  },
  {
    id: 'lotus_petals',
    name: 'Mưa Cánh Hoa',
    description: '+2 Cánh hoa bắn ra thêm',
    rarity: Rarity.EPIC,
    type: 'LOTUS_BUFF',
    effect: (s) => ({ ...s, lotusAmount: s.lotusAmount + 2 })
  },
  {
    id: 'lotus_godly',
    name: 'QUỐC HOA VIỆT NAM',
    description: 'X2 Sát thương, +4 Cánh hoa, +50% Phạm vi (GODLY)',
    rarity: Rarity.GODLY,
    type: 'LOTUS_BUFF',
    effect: (s) => ({ ...s, lotusArea: s.lotusArea + 0.5, lotusDamageMult: s.lotusDamageMult + 1.0, lotusAmount: s.lotusAmount + 4 })
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Tư tưởng Hồ Chí Minh',
    difficulty: 1,
    question: 'Hồ Chí Minh sinh ngày tháng năm nào?',
    options: ['19/05/1890', '19/05/1891', '02/09/1945', '19/05/1969'],
    correctIndex: 0
  },
  {
    id: 2,
    topic: 'Tư tưởng Hồ Chí Minh',
    difficulty: 1,
    question: 'Bản Tuyên ngôn độc lập được đọc tại đâu?',
    options: ['Quảng trường Ba Đình', 'Dinh Độc Lập', 'Bến Nhà Rồng', 'Pác Bó'],
    correctIndex: 0
  },
  {
    id: 3,
    topic: 'Đạo đức',
    difficulty: 2,
    question: '"Không có gì quý hơn độc lập tự do" là câu nói của ai?',
    options: ['Trần Hưng Đạo', 'Võ Nguyên Giáp', 'Hồ Chí Minh', 'Lê Lợi'],
    correctIndex: 2
  },
  {
    id: 4,
    topic: 'Cách mạng',
    difficulty: 2,
    question: 'Bác Hồ ra đi tìm đường cứu nước vào năm nào?',
    options: ['1911', '1920', '1930', '1945'],
    correctIndex: 0
  },
  {
    id: 5,
    topic: 'Văn hóa',
    difficulty: 3,
    question: 'Tên gọi khác của Bác Hồ khi ở Pháp là gì?',
    options: ['Nguyễn Ái Quốc', 'Nguyễn Tất Thành', 'Lý Tự Trọng', 'Văn Ba'],
    correctIndex: 0
  },
  {
    id: 6,
    topic: 'Lịch sử',
    difficulty: 3,
    question: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?',
    options: ['1954', '1945', '1975', '1968'],
    correctIndex: 0
  }
];

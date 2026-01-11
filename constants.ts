
import { Rarity, Buff, Question } from './types';

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export const BUFFS: Buff[] = [
  // --- STAT BUFFS (GLOBAL) ---
  {
    id: 'hp_common_1',
    name: 'Bánh Mì',
    description: '+30 Máu Tối Đa',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 30, hp: s.hp + 30 })
  },
  {
    id: 'hp_common_2',
    name: 'Cơm Trắng',
    description: '+25 Máu Tối Đa',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 25, hp: s.hp + 25 })
  },
  {
    id: 'hp_common_3',
    name: 'Nước Mía',
    description: '+20 Máu Tối Đa & +0.2 Hồi Máu/giây',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 20, hp: s.hp + 20, hpRegen: s.hpRegen + 0.2 })
  },
  {
    id: 'hp_regen_common_1',
    name: 'Huyết Thanh',
    description: '+0.5 Hồi Máu/giây',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 0.5 })
  },
  {
    id: 'hp_regen_common_2',
    name: 'Cao Dán',
    description: '+0.4 Hồi Máu/giây',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 0.4 })
  },
  {
    id: 'spd_common_1',
    name: 'Giày Vải',
    description: '+8% Tốc độ di chuyển',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.08 })
  },
  {
    id: 'spd_common_2',
    name: 'Dép Lào',
    description: '+7% Tốc độ di chuyển',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.07 })
  },
  {
    id: 'armor_common',
    name: 'Áo Ba Lỗ',
    description: '+0.5 Giáp',
    rarity: Rarity.COMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 0.5 })
  },
  {
    id: 'armor_uncommon_1',
    name: 'Áo Giáp Da',
    description: '+1 Giáp & +0.3 Hồi Giáp/giây',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 1, armorRegen: s.armorRegen + 0.3 })
  },
  {
    id: 'armor_uncommon_2',
    name: 'Mũ Cối',
    description: '+1.5 Giáp',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 1.5 })
  },
  {
    id: 'hp_regen_uncommon_1',
    name: 'Băng Y Tế',
    description: '+1 Hồi Máu/giây',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 1 })
  },
  {
    id: 'hp_regen_uncommon_2',
    name: 'Thuốc Nam',
    description: '+0.8 Hồi Máu/giây',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 0.8 })
  },
  {
    id: 'hp_uncommon_1',
    name: 'Bún Bò Huế',
    description: '+40 Máu Tối Đa',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 40, hp: s.hp + 40 })
  },
  {
    id: 'spd_uncommon_1',
    name: 'Giày Thể Thao',
    description: '+15% Tốc độ di chuyển',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.15 })
  },
  {
    id: 'spd_uncommon_2',
    name: 'Dây Giày Mới',
    description: '+12% Tốc độ di chuyển',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.12 })
  },
  {
    id: 'armor_regen_uncommon',
    name: 'Dầu Bôi Trơn',
    description: '+0.6 Hồi Giáp/giây',
    rarity: Rarity.UNCOMMON,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armorRegen: s.armorRegen + 0.6 })
  },
  {
    id: 'hp_rare_1',
    name: 'Phở Bò Đặc Biệt',
    description: '+50 Máu Tối Đa & +0.5 Hồi Máu/giây',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 50, hp: s.hp + 50, hpRegen: s.hpRegen + 0.5 })
  },
  {
    id: 'hp_rare_2',
    name: 'Cơm Tấm Sườn',
    description: '+60 Máu Tối Đa',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 60, hp: s.hp + 60 })
  },
  {
    id: 'armor_rare_1',
    name: 'Áo Giáp Sắt',
    description: '+2 Giáp & +0.5 Hồi Giáp/giây',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 2, armorRegen: s.armorRegen + 0.5 })
  },
  {
    id: 'armor_rare_2',
    name: 'Khiên Gỗ',
    description: '+3 Giáp',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 3 })
  },
  {
    id: 'hp_regen_rare',
    name: 'Sâm Hàn Quốc',
    description: '+1.5 Hồi Máu/giây',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 1.5 })
  },
  {
    id: 'spd_rare',
    name: 'Giày Chạy Bộ Pro',
    description: '+20% Tốc độ di chuyển',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.2 })
  },
  {
    id: 'combo_rare_1',
    name: 'Bộ Thể Dục',
    description: '+15% Tốc độ & +30 Máu',
    rarity: Rarity.RARE,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.15, maxHP: s.maxHP + 30, hp: s.hp + 30 })
  },
  {
    id: 'armor_epic_1',
    name: 'Giáp Thép Titan',
    description: '+3 Giáp & +1 Hồi Giáp/giây',
    rarity: Rarity.EPIC,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 3, armorRegen: s.armorRegen + 1 })
  },
  {
    id: 'armor_epic_2',
    name: 'Khiên Sắt Rèn',
    description: '+5 Giáp',
    rarity: Rarity.EPIC,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 5 })
  },
  {
    id: 'hp_epic_1',
    name: 'Lẩu Thái Hải Sản',
    description: '+80 Máu & +1 Hồi Máu/giây',
    rarity: Rarity.EPIC,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 80, hp: s.hp + 80, hpRegen: s.hpRegen + 1 })
  },
  {
    id: 'spd_epic',
    name: 'Giày Rocket',
    description: '+25% Tốc độ di chuyển',
    rarity: Rarity.EPIC,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.25 })
  },
  {
    id: 'combo_epic_1',
    name: 'Bộ Giáp Chiến Binh',
    description: '+4 Giáp & +50 Máu',
    rarity: Rarity.EPIC,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 4, maxHP: s.maxHP + 50, hp: s.hp + 50 })
  },
  {
    id: 'combo_epic_2',
    name: 'Bùa Hộ Mệnh',
    description: '+2 Hồi Máu/giây & +2 Giáp',
    rarity: Rarity.EPIC,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 2, armor: s.armor + 2 })
  },
  {
    id: 'regen_legendary_1',
    name: 'Trái Tim Rồng',
    description: '+3 Hồi Máu/giây & +2 Hồi Giáp/giây',
    rarity: Rarity.LEGENDARY,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, hpRegen: s.hpRegen + 3, armorRegen: s.armorRegen + 2 })
  },
  {
    id: 'hp_legendary',
    name: 'Tiệc Hoàng Gia',
    description: '+120 Máu & +2 Hồi Máu/giây',
    rarity: Rarity.LEGENDARY,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 120, hp: s.hp + 120, hpRegen: s.hpRegen + 2 })
  },
  {
    id: 'armor_legendary',
    name: 'Giáp Rồng Thiêng',
    description: '+6 Giáp & +1.5 Hồi Giáp/giây',
    rarity: Rarity.LEGENDARY,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, armor: s.armor + 6, armorRegen: s.armorRegen + 1.5 })
  },
  {
    id: 'spd_legendary',
    name: 'Giày Thần Tốc',
    description: '+35% Tốc độ di chuyển',
    rarity: Rarity.LEGENDARY,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, moveSpeed: s.moveSpeed * 1.35 })
  },
  {
    id: 'combo_legendary',
    name: 'Linh Hồn Chiến Binh',
    description: '+80 Máu & +4 Giáp & +15% Tốc độ',
    rarity: Rarity.LEGENDARY,
    type: 'STAT_BUFF',
    effect: (s) => ({ ...s, maxHP: s.maxHP + 80, hp: s.hp + 80, armor: s.armor + 4, moveSpeed: s.moveSpeed * 1.15 })
  },

  // --- GUN BUFFS ---
  {
    id: 'gun_dmg_common_1',
    name: 'Đạn Chì',
    description: '+15% Sát thương Súng',
    rarity: Rarity.COMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.15 })
  },
  {
    id: 'gun_dmg_common_2',
    name: 'Thuốc Súng Tốt',
    description: '+12% Sát thương Súng',
    rarity: Rarity.COMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.12 })
  },
  {
    id: 'gun_dmg_common_3',
    name: 'Đạn Đồng',
    description: '+10% Sát thương Súng',
    rarity: Rarity.COMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.1 })
  },
  {
    id: 'gun_speed_common',
    name: 'Lò Xo Giật',
    description: '+10% Tốc độ bắn',
    rarity: Rarity.COMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunCooldownMult: s.gunCooldownMult * 0.9 })
  },
  {
    id: 'gun_speed_uncommon_1',
    name: 'Nòng Súng Nhẹ',
    description: '+15% Tốc độ bắn',
    rarity: Rarity.UNCOMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunCooldownMult: s.gunCooldownMult * 0.85 })
  },
  {
    id: 'gun_speed_uncommon_2',
    name: 'Cò Súng Mượt',
    description: '+18% Tốc độ bắn',
    rarity: Rarity.UNCOMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunCooldownMult: s.gunCooldownMult * 0.82 })
  },
  {
    id: 'gun_dmg_uncommon_1',
    name: 'Đạn Thép',
    description: '+25% Sát thương Súng',
    rarity: Rarity.UNCOMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.25 })
  },
  {
    id: 'gun_dmg_uncommon_2',
    name: 'Đạn Nhọn',
    description: '+20% Sát thương Súng',
    rarity: Rarity.UNCOMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.2 })
  },
  {
    id: 'gun_combo_uncommon',
    name: 'Súng Cải Tiến',
    description: '+15% Sát thương & +10% Tốc độ',
    rarity: Rarity.UNCOMMON,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.15, gunCooldownMult: s.gunCooldownMult * 0.9 })
  },
  {
    id: 'gun_amount_rare_1',
    name: 'Nòng Kép',
    description: '+1 Đạn bắn ra',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 1 })
  },
  {
    id: 'gun_pierce_rare_1',
    name: 'Đạn Xuyên Phá',
    description: '+1 Xuyên thấu',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunPierce: s.gunPierce + 1 })
  },
  {
    id: 'gun_dmg_rare_1',
    name: 'Đạn Thép Hợp Kim',
    description: '+35% Sát thương Súng',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.35 })
  },
  {
    id: 'gun_speed_rare',
    name: 'Cơ Cấu Tự Động',
    description: '+25% Tốc độ bắn',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunCooldownMult: s.gunCooldownMult * 0.75 })
  },
  {
    id: 'gun_combo_rare_1',
    name: 'Súng Chiến Đấu',
    description: '+1 Đạn & +15% Sát thương',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 1, gunDamageMult: s.gunDamageMult + 0.15 })
  },
  {
    id: 'gun_combo_rare_2',
    name: 'Đạn Xuyên Sắt',
    description: '+1 Xuyên & +20% Sát thương',
    rarity: Rarity.RARE,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunPierce: s.gunPierce + 1, gunDamageMult: s.gunDamageMult + 0.2 })
  },
  {
    id: 'gun_combo_epic_1',
    name: 'Hệ Thống Tự Động',
    description: '+1 Đạn & +20% Tốc độ bắn',
    rarity: Rarity.EPIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 1, gunCooldownMult: s.gunCooldownMult * 0.8 })
  },
  {
    id: 'gun_pierce_epic_1',
    name: 'Đạn Xuyên Giáp',
    description: '+2 Xuyên thấu & +15% Sát thương',
    rarity: Rarity.EPIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunPierce: s.gunPierce + 2, gunDamageMult: s.gunDamageMult + 0.15 })
  },
  {
    id: 'gun_amount_epic',
    name: 'Băng Đạn Lớn',
    description: '+2 Đạn bắn ra',
    rarity: Rarity.EPIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 2 })
  },
  {
    id: 'gun_dmg_epic',
    name: 'Đạn Uranium',
    description: '+50% Sát thương Súng',
    rarity: Rarity.EPIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunDamageMult: s.gunDamageMult + 0.5 })
  },
  {
    id: 'gun_combo_epic_2',
    name: 'Súng Máy Hạng Nặng',
    description: '+2 Đạn & +30% Sát thương',
    rarity: Rarity.EPIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 2, gunDamageMult: s.gunDamageMult + 0.3 })
  },
  {
    id: 'gun_legendary_1',
    name: 'Súng Phóng Lôi',
    description: '+2 Đạn & +40% Sát thương',
    rarity: Rarity.LEGENDARY,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 2, gunDamageMult: s.gunDamageMult + 0.4 })
  },
  {
    id: 'gun_legendary_2',
    name: 'Đạn Laser Plasma',
    description: '+3 Xuyên & +30% Sát thương',
    rarity: Rarity.LEGENDARY,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunPierce: s.gunPierce + 3, gunDamageMult: s.gunDamageMult + 0.3 })
  },
  {
    id: 'gun_legendary_3',
    name: 'Gatling Gun',
    description: '+3 Đạn & +35% Tốc độ',
    rarity: Rarity.LEGENDARY,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 3, gunCooldownMult: s.gunCooldownMult * 0.65 })
  },
  {
    id: 'gun_godly',
    name: 'HỎA THẦN CÔNG',
    description: '+4 Đạn & +30% Tốc độ & +40% Sát thương',
    rarity: Rarity.GODLY,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 4, gunCooldownMult: s.gunCooldownMult * 0.7, gunDamageMult: s.gunDamageMult + 0.4 })
  },
  {
    id: 'gun_mythic',
    name: 'VŨ KHÍ HỦY DIỆT',
    description: '+5 Đạn & +5 Xuyên & +60% Sát thương',
    rarity: Rarity.MYTHIC,
    type: 'GUN_BUFF',
    effect: (s) => ({ ...s, gunAmount: s.gunAmount + 5, gunPierce: s.gunPierce + 5, gunDamageMult: s.gunDamageMult + 0.6 })
  },

  // --- BOOK BUFFS ---
  {
    id: 'book_spd_common_1',
    name: 'Bìa Nhẹ',
    description: '+12% Tốc độ xoay Sách',
    rarity: Rarity.COMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookSpeed: s.bookSpeed * 1.12 })
  },
  {
    id: 'book_spd_common_2',
    name: 'Trang Mỏng',
    description: '+10% Tốc độ xoay Sách',
    rarity: Rarity.COMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookSpeed: s.bookSpeed * 1.1 })
  },
  {
    id: 'book_dmg_common_1',
    name: 'Giấy Dày',
    description: '+15% Sát thương Sách',
    rarity: Rarity.COMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.15 })
  },
  {
    id: 'book_dmg_common_2',
    name: 'Góc Sách Nhọn',
    description: '+12% Sát thương Sách',
    rarity: Rarity.COMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.12 })
  },
  {
    id: 'book_area_common',
    name: 'Khổ Giấy A4',
    description: '+10% Kích thước Sách',
    rarity: Rarity.COMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookArea: s.bookArea + 0.1 })
  },
  {
    id: 'book_area_uncommon_1',
    name: 'Khổ Giấy Lớn',
    description: '+20% Kích thước Sách',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookArea: s.bookArea + 0.2 })
  },
  {
    id: 'book_area_uncommon_2',
    name: 'Sách Bìa Cứng',
    description: '+18% Kích thước Sách',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookArea: s.bookArea + 0.18 })
  },
  {
    id: 'book_spd_uncommon_1',
    name: 'Đóng Bìa Cứng',
    description: '+25% Tốc độ xoay Sách',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookSpeed: s.bookSpeed * 1.25 })
  },
  {
    id: 'book_spd_uncommon_2',
    name: 'Vòng Bi Cao Cấp',
    description: '+22% Tốc độ xoay Sách',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookSpeed: s.bookSpeed * 1.22 })
  },
  {
    id: 'book_dmg_uncommon',
    name: 'Sách Kim Loại',
    description: '+25% Sát thương Sách',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.25 })
  },
  {
    id: 'book_combo_uncommon',
    name: 'Từ Điển Oxford',
    description: '+15% Sát thương & +15% Kích thước',
    rarity: Rarity.UNCOMMON,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.15, bookArea: s.bookArea + 0.15 })
  },
  {
    id: 'book_amount_rare_1',
    name: 'Tủ Sách Mini',
    description: '+1 Quyển sách',
    rarity: Rarity.RARE,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 1 })
  },
  {
    id: 'book_dmg_rare',
    name: 'Sách Cổ Điển',
    description: '+35% Sát thương Sách',
    rarity: Rarity.RARE,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.35 })
  },
  {
    id: 'book_area_rare',
    name: 'Bách Khoa Toàn Thư',
    description: '+30% Kích thước Sách',
    rarity: Rarity.RARE,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookArea: s.bookArea + 0.3 })
  },
  {
    id: 'book_spd_rare',
    name: 'Động Cơ Xoay',
    description: '+35% Tốc độ xoay',
    rarity: Rarity.RARE,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookSpeed: s.bookSpeed * 1.35 })
  },
  {
    id: 'book_combo_rare',
    name: 'Sách Phép Thuật',
    description: '+1 Sách & +20% Sát thương',
    rarity: Rarity.RARE,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 1, bookDamageMult: s.bookDamageMult + 0.2 })
  },
  {
    id: 'book_combo_epic_1',
    name: 'Thư Viện Nhỏ',
    description: '+1 Sách & +25% Kích thước',
    rarity: Rarity.EPIC,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 1, bookArea: s.bookArea + 0.25 })
  },
  {
    id: 'book_combo_epic_2',
    name: 'Sách Kiếm Hiệp',
    description: '+2 Sách & +15% Tốc độ',
    rarity: Rarity.EPIC,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 2, bookSpeed: s.bookSpeed * 1.15 })
  },
  {
    id: 'book_dmg_epic',
    name: 'Sách Đá Granite',
    description: '+50% Sát thương Sách',
    rarity: Rarity.EPIC,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.5 })
  },
  {
    id: 'book_area_epic',
    name: 'Sách Khổng Lồ',
    description: '+40% Kích thước Sách',
    rarity: Rarity.EPIC,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookArea: s.bookArea + 0.4 })
  },
  {
    id: 'book_legendary_1',
    name: 'Thư Viện Di Động',
    description: '+2 Sách & +30% Kích thước',
    rarity: Rarity.LEGENDARY,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 2, bookArea: s.bookArea + 0.3 })
  },
  {
    id: 'book_legendary_2',
    name: 'Kinh Thánh Cổ',
    description: '+3 Sách & +25% Tốc độ',
    rarity: Rarity.LEGENDARY,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 3, bookSpeed: s.bookSpeed * 1.25 })
  },
  {
    id: 'book_legendary_3',
    name: 'Sách Ma Thuật Tối Thượng',
    description: '+40% Sát thương & +40% Kích thước',
    rarity: Rarity.LEGENDARY,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookDamageMult: s.bookDamageMult + 0.4, bookArea: s.bookArea + 0.4 })
  },
  {
    id: 'book_mythic',
    name: 'TRI THỨC VÔ TẬN',
    description: '+3 Sách & +50% Kích thước & +40% Sát thương',
    rarity: Rarity.MYTHIC,
    type: 'BOOK_BUFF',
    effect: (s) => ({ ...s, bookAmount: s.bookAmount + 3, bookArea: s.bookArea + 0.5, bookDamageMult: s.bookDamageMult + 0.4 })
  },
  // --- LIGHTNING BUFFS ---
  {
    id: 'lightning_unlock',
    name: 'Triệu Hồi Sấm Sét',
    description: 'Mở khóa / +1 Tia sét',
    rarity: Rarity.RARE,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 1 })
  },
  {
    id: 'lightning_dmg_common',
    name: 'Tụ Điện Nhỏ',
    description: '+15% Sát thương Sét',
    rarity: Rarity.COMMON,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.15 })
  },
  {
    id: 'lightning_dmg_uncommon_1',
    name: 'Điện Áp Cao',
    description: '+25% Sát thương Sét',
    rarity: Rarity.UNCOMMON,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.25 })
  },
  {
    id: 'lightning_dmg_uncommon_2',
    name: 'Dây Dẫn Đồng',
    description: '+20% Sát thương Sét',
    rarity: Rarity.UNCOMMON,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.2 })
  },
  {
    id: 'lightning_area_uncommon',
    name: 'Sóng Điện Từ',
    description: '+20% Phạm vi Sét',
    rarity: Rarity.UNCOMMON,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningArea: s.lightningArea + 0.2 })
  },
  {
    id: 'lightning_area_rare_1',
    name: 'Bão Từ Trường',
    description: '+30% Phạm vi nổ Sét',
    rarity: Rarity.RARE,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningArea: s.lightningArea + 0.3 })
  },
  {
    id: 'lightning_dmg_rare',
    name: 'Biến Áp 1000V',
    description: '+35% Sát thương Sét',
    rarity: Rarity.RARE,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.35 })
  },
  {
    id: 'lightning_cooldown_rare',
    name: 'Tụ Điện Siêu Tốc',
    description: '-20% Hồi chiêu Sét',
    rarity: Rarity.RARE,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningCooldownMult: s.lightningCooldownMult * 0.8 })
  },
  {
    id: 'lightning_amount_epic_1',
    name: 'Chuỗi Sét Liên Hoàn',
    description: '+2 Tia sét',
    rarity: Rarity.EPIC,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 2 })
  },
  {
    id: 'lightning_cooldown_epic_1',
    name: 'Tụ Điện Nhanh',
    description: '-25% Hồi chiêu Sét',
    rarity: Rarity.EPIC,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningCooldownMult: s.lightningCooldownMult * 0.75 })
  },
  {
    id: 'lightning_dmg_epic',
    name: 'Điện Áp Siêu Cao',
    description: '+50% Sát thương Sét',
    rarity: Rarity.EPIC,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.5 })
  },
  {
    id: 'lightning_area_epic',
    name: 'Bão Điện Từ Mạnh',
    description: '+40% Phạm vi Sét',
    rarity: Rarity.EPIC,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningArea: s.lightningArea + 0.4 })
  },
  {
    id: 'lightning_combo_epic',
    name: 'Máy Phát Điện',
    description: '+2 Sét & +30% Sát thương',
    rarity: Rarity.EPIC,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 2, lightningDamageMult: s.lightningDamageMult + 0.3 })
  },
  {
    id: 'lightning_legendary_1',
    name: 'Nhà Máy Điện Hạt Nhân',
    description: '+3 Sét & +40% Sát thương',
    rarity: Rarity.LEGENDARY,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 3, lightningDamageMult: s.lightningDamageMult + 0.4 })
  },
  {
    id: 'lightning_legendary_2',
    name: 'Búa Sét Mjolnir',
    description: '+60% Sát thương & +50% Phạm vi',
    rarity: Rarity.LEGENDARY,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningDamageMult: s.lightningDamageMult + 0.6, lightningArea: s.lightningArea + 0.5 })
  },
  {
    id: 'lightning_godly',
    name: 'THẦN SẤM THOR',
    description: '+4 Sét & -30% Hồi chiêu & +40% Phạm vi',
    rarity: Rarity.GODLY,
    type: 'LIGHTNING_BUFF',
    effect: (s) => ({ ...s, lightningAmount: s.lightningAmount + 4, lightningCooldownMult: s.lightningCooldownMult * 0.7, lightningArea: s.lightningArea + 0.4 })
  },
  // --- NOVA BLAST BUFFS ---
  {
    id: 'nova_dmg_common',
    name: 'Thuốc Nổ',
    description: '+15% Sát thương Nổ',
    rarity: Rarity.COMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.15 })
  },
  {
    id: 'nova_area_common',
    name: 'Bom Nhỏ',
    description: '+12% Phạm vi Nổ',
    rarity: Rarity.COMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaArea: s.novaArea + 0.12 })
  },
  {
    id: 'nova_dmg_uncommon_1',
    name: 'Lõi Nóng Chảy',
    description: '+30% Sát thương Nổ',
    rarity: Rarity.UNCOMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.3 })
  },
  {
    id: 'nova_dmg_uncommon_2',
    name: 'TNT Chất Lượng Cao',
    description: '+25% Sát thương Nổ',
    rarity: Rarity.UNCOMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.25 })
  },
  {
    id: 'nova_area_uncommon_1',
    name: 'Sóng Xung Kích',
    description: '+25% Phạm vi Nổ',
    rarity: Rarity.UNCOMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaArea: s.novaArea + 0.25 })
  },
  {
    id: 'nova_area_uncommon_2',
    name: 'Bom Mảnh',
    description: '+20% Phạm vi Nổ',
    rarity: Rarity.UNCOMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaArea: s.novaArea + 0.2 })
  },
  {
    id: 'nova_cooldown_uncommon',
    name: 'Kíp Nổ Nhanh',
    description: '-15% Hồi chiêu Nổ',
    rarity: Rarity.UNCOMMON,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaCooldownMult: s.novaCooldownMult * 0.85 })
  },
  {
    id: 'nova_aftershock_rare_1',
    name: 'Dư Chấn',
    description: '+25% Sát thương & +25% Phạm vi',
    rarity: Rarity.RARE,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.25, novaArea: s.novaArea + 0.25 })
  },
  {
    id: 'nova_cooldown_rare_1',
    name: 'Tản Nhiệt Nhanh',
    description: '-20% Hồi chiêu Nổ',
    rarity: Rarity.RARE,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaCooldownMult: s.novaCooldownMult * 0.8 })
  },
  {
    id: 'nova_dmg_rare',
    name: 'C4 Quân Đội',
    description: '+40% Sát thương Nổ',
    rarity: Rarity.RARE,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.4 })
  },
  {
    id: 'nova_area_rare',
    name: 'Bom Chùm',
    description: '+35% Phạm vi Nổ',
    rarity: Rarity.RARE,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaArea: s.novaArea + 0.35 })
  },
  {
    id: 'nova_epic_1',
    name: 'Lõi Phản Ứng',
    description: '+50% Sát thương Nổ',
    rarity: Rarity.EPIC,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.5 })
  },
  {
    id: 'nova_combo_epic_1',
    name: 'Bom Nhiệt Hạch',
    description: '+40% Sát thương & +30% Phạm vi',
    rarity: Rarity.EPIC,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.4, novaArea: s.novaArea + 0.3 })
  },
  {
    id: 'nova_cooldown_epic',
    name: 'Hệ Thống Tự Nạp',
    description: '-30% Hồi chiêu Nổ',
    rarity: Rarity.EPIC,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaCooldownMult: s.novaCooldownMult * 0.7 })
  },
  {
    id: 'nova_area_epic',
    name: 'Sóng Nổ Khổng Lồ',
    description: '+50% Phạm vi Nổ',
    rarity: Rarity.EPIC,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaArea: s.novaArea + 0.5 })
  },
  {
    id: 'nova_legendary_1',
    name: 'Siêu Tân Tinh',
    description: '+70% Sát thương & +50% Phạm vi',
    rarity: Rarity.LEGENDARY,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.7, novaArea: s.novaArea + 0.5 })
  },
  {
    id: 'nova_legendary_2',
    name: 'Bom Nguyên Tử',
    description: '+80% Sát thương & -25% Hồi chiêu',
    rarity: Rarity.LEGENDARY,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 0.8, novaCooldownMult: s.novaCooldownMult * 0.75 })
  },
  {
    id: 'nova_godly',
    name: 'BIG BANG',
    description: '+120% Sát thương & +60% Phạm vi & -30% Hồi chiêu',
    rarity: Rarity.GODLY,
    type: 'NOVA_BUFF',
    effect: (s) => ({ ...s, novaDamageMult: s.novaDamageMult + 1.2, novaArea: s.novaArea + 0.6, novaCooldownMult: s.novaCooldownMult * 0.7 })
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

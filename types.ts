
export enum GameState {
  MENU = 'MENU',
  LOADING = 'LOADING', // Màn hình chờ
  PLAYING = 'PLAYING',
  LEVEL_UP = 'LEVEL_UP',
  QUIZ = 'QUIZ',
  GAMEOVER = 'GAMEOVER',
  WIN = 'WIN'
}

export enum Rarity {
  COMMON = 'COMMON',       // Trắng
  UNCOMMON = 'UNCOMMON',   // Xanh lá
  RARE = 'RARE',           // Xanh dương
  EPIC = 'EPIC',           // Vàng
  LEGENDARY = 'LEGENDARY', // Tím
  MYTHIC = 'MYTHIC',       // Cam
  GODLY = 'GODLY'          // Đỏ
}

export interface GameHistory {
  id: string;
  date: string;
  kills: number;
  level: number;
  timeSurvived: string;
}

export interface Buff {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  effect: (stats: PlayerStats) => PlayerStats;
  type: 'GUN_BUFF' | 'BOOK_BUFF' | 'LIGHTNING_BUFF' | 'STAT_BUFF';
}

export interface PlayerStats {
  // Core Stats
  maxHP: number;
  hp: number;
  maxArmor: number; // Giáp tối đa (Mới)
  currentArmor: number; // Giáp hiện tại (Mới)
  armor: number; // Chỉ số phòng thủ (Giảm sát thương)
  moveSpeed: number;

  // Gun Specific Stats
  gunDamageMult: number;
  gunCooldownMult: number;
  gunAmount: number;
  gunPierce: number;
  gunSpeed: number;

  // Book Specific Stats
  bookDamageMult: number;
  bookCooldownMult: number;
  bookAmount: number;
  bookArea: number;
  bookSpeed: number; // Tốc độ xoay
  
  // Lightning Specific Stats (NEW)
  lightningDamageMult: number;
  lightningCooldownMult: number;
  lightningAmount: number;
  lightningArea: number;

  // Progression
  level: number;
  exp: number;
  expToNext: number;
  kills: number;
  magnetRange: number;
}

export interface Question {
  id: number;
  topic: string;
  difficulty: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

export interface Enemy extends Entity {
  type: 'NORM_1' | 'NORM_2' | 'SHOOTER' | 'EXPLODER' | 'ELITE' | 'BOSS_1' | 'BOSS_2' | 'BOSS_3';
  aiType: 'MELEE' | 'RANGED' | 'KAMIKAZE' | 'BOSS';
  hp: number;
  maxHP: number;
  speed: number;
  damage: number;
  color: string;
  borderColor: string;
  flashTime: number;
  
  // Advanced Attack Logic
  attackRange?: number;
  attackPattern?: 'BASIC' | 'BURST' | 'NOVA' | 'SLAM' | 'HOMING' | 'LASER' | 'SPIRAL';
  attackState?: 'IDLE' | 'WARN' | 'FIRING' | 'COOLDOWN' | 'CHARGING'; 
  stateTimer?: number; // Generic timer for states
  burstCount?: number; // For burst attacks
  secondaryTimer?: number; // For sub-states like burst fire rate
  
  // Special State Flags
  isCharging?: boolean; // For Kamikaze
  attackTimer?: number; // For Kamikaze charge duration
  
  // Laser Specifics
  laserAngle?: number;
  rotationSpeed?: number;
}

export interface Projectile extends Entity {
  vx: number;
  vy: number;
  damage: number;
  life: number;
  rotation: number;
  type: 'PLAYER_BULLET' | 'ENEMY_BULLET';
  pierce: number;
  color: string;
  
  // Advanced Behaviors
  isHoming?: boolean;
  homingForce?: number;
}

export interface Particle extends Entity {
  vx: number;
  vy: number;
  life: number;
  maxLife: number; // For fading alpha
  color: string;
  size: number;
  type: 'DOT' | 'SHOCKWAVE' | 'SQUARE' | 'SHELL' | 'STAR' | 'MUZZLE' | 'BEAM_CORE' | 'LIGHTNING' | 'FLASH';
  drag: number;   // Friction (0-1)
  growth: number; // Size change over time
  rotation?: number; 
  vRot?: number;
  
  // Lightning specific
  path?: {x: number, y: number}[];
  branches?: {x: number, y: number}[][];
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  vx: number;
  vy: number;
}

export interface ExpGem extends Entity {
  amount: number;
  color: string;
}

export interface HealthDrop extends Entity {
  healAmount: number;
  life: number; // Hearts might despawn after a long time
}

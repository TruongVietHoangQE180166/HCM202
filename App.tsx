
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  GameState, PlayerStats, Enemy, Projectile, Particle, ExpGem, HealthDrop,
  Rarity, Buff, Question, FloatingText, GameHistory 
} from './types';
import { BUFFS, QUESTIONS, CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import { checkCircleCollision, getRandomRange, getDistance, ScreenShake } from './utils';
import HUD from './components/HUD';
import LevelUpModal from './components/LevelUpModal';
import QuizModal from './components/QuizModal';
import { 
  Play, BarChart2, BookOpen, ShieldCheck, Gamepad2, AlertTriangle, Swords, X, ArrowRight 
} from 'lucide-react';

// --- INITIAL STATS (NERFED FOR HIGHER DIFFICULTY) ---
const INITIAL_STATS: PlayerStats = {
  maxHP: 80, 
  hp: 80,
  maxArmor: 20, 
  currentArmor: 20,
  armor: 0,
  moveSpeed: 220, 
  gunDamageMult: 0.8, 
  gunCooldownMult: 1.0, gunAmount: 1, gunPierce: 0, gunSpeed: 1.0,
  bookDamageMult: 0.8, 
  bookCooldownMult: 1.0, bookAmount: 1, bookArea: 0.8, bookSpeed: 1.0,
  
  // Lightning Stats
  lightningDamageMult: 1.0, 
  lightningCooldownMult: 1.0, 
  lightningAmount: 1, 
  lightningArea: 1.0,

  magnetRange: 150, 
  level: 1, exp: 0, expToNext: 100, kills: 0
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [timer, setTimer] = useState(0);
  const [stats, setStats] = useState<PlayerStats>(INITIAL_STATS);
  const [activeBoss, setActiveBoss] = useState<Enemy | null>(null);
  
  // Menu UI States
  const [showHistory, setShowHistory] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Gameplay States
  const [levelUpOptions, setLevelUpOptions] = useState<Buff[]>([]);
  const [selectedBuff, setSelectedBuff] = useState<Buff | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  
  const playerRef = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, size: 40 });
  
  const enemiesRef = useRef<Enemy[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const gemsRef = useRef<ExpGem[]>([]);
  const healthDropsRef = useRef<HealthDrop[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const shakeManager = useRef(new ScreenShake());
  const gameTimeRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const weaponTimersRef = useRef({ gun: 0, book: 0, lightning: 0 });
  const iFrameRef = useRef(0);
  const statsRef = useRef<PlayerStats>(INITIAL_STATS);
  
  const zoneRef = useRef({ active: false, radius: 0, center: { x: 0, y: 0 }, lastTriggeredLevel: 0 });
  const bossFlags = useRef({ boss1: false, boss2: false, boss3: false });

  useEffect(() => { statsRef.current = stats; }, [stats]);

  useEffect(() => {
    const saved = localStorage.getItem('gameHistory');
    if (saved) { try { setHistory(JSON.parse(saved)); } catch (e) { console.error(e); } }
  }, []);

  const saveToHistory = (s: PlayerStats, time: number) => {
    const newEntry: GameHistory = {
      id: Math.random().toString(),
      date: new Date().toLocaleDateString('vi-VN'),
      kills: s.kills,
      level: s.level,
      timeSurvived: `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`
    };
    const updated = [newEntry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('gameHistory', JSON.stringify(updated));
  };

  const startLoading = (nextState: GameState, delay = 2000) => {
    setGameState(GameState.LOADING);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setGameState(nextState);
    }, delay);
  };

  const startGame = () => {
    setTimer(0);
    setStats(INITIAL_STATS);
    setActiveBoss(null);
    gameTimeRef.current = 0;
    enemiesRef.current = [];
    projectilesRef.current = [];
    gemsRef.current = [];
    healthDropsRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    playerRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, size: 40 };
    weaponTimersRef.current = { gun: 0, book: 0, lightning: 0 };
    zoneRef.current = { active: false, radius: 0, center: {x:0, y:0}, lastTriggeredLevel: 0 };
    bossFlags.current = { boss1: false, boss2: false, boss3: false };
    lastTimeRef.current = performance.now();
    startLoading(GameState.PLAYING);
  };

  const handleGameOver = () => {
    saveToHistory(statsRef.current, gameTimeRef.current);
    startLoading(GameState.GAMEOVER, 1500);
  };

  const backToMenu = () => { startLoading(GameState.MENU, 1000); };

  const spawnEnemy = useCallback(() => {
    const time = gameTimeRef.current;
    
    let bossType: Enemy['type'] | null = null;
    let bossAI: Enemy['aiType'] | null = null;
    
    // Boss Spawning Times: 3m, 6m, 9m
    if (time > 180 && !bossFlags.current.boss1) { 
        bossFlags.current.boss1 = true; bossType = 'BOSS_1'; bossAI = 'BOSS';
    } 
    else if (time > 360 && !bossFlags.current.boss2) { 
        bossFlags.current.boss2 = true; bossType = 'BOSS_2'; bossAI = 'BOSS';
    }
    else if (time > 540 && !bossFlags.current.boss3) { 
        bossFlags.current.boss3 = true; bossType = 'BOSS_3'; bossAI = 'BOSS';
    }

    const angle = Math.random() * Math.PI * 2;
    const dist = 1100;
    const x = playerRef.current.x + Math.cos(angle) * dist;
    const y = playerRef.current.y + Math.sin(angle) * dist;
    
    let type: Enemy['type'] = 'NORM_1';
    let aiType: Enemy['aiType'] = 'MELEE';
    let hp = 30, speed = 140, dmg = 15, size = 30;
    let color = '#d1d5db'; 
    let borderColor = '#374151';
    let attackRange = 0;
    
    // Default AI Properties
    let attackPattern: Enemy['attackPattern'] = 'BASIC';
    let attackState: Enemy['attackState'] = 'IDLE';
    let stateTimer = 0;

    const scale = 1 + (time / 60) * 0.8; 
    const r = Math.random();

    if (bossType) {
        hp = 8000 * scale; size = 120; color = '#000'; borderColor = '#ef4444';
        dmg = 80 * scale; speed = 90; type = bossType; aiType = 'BOSS';
        
        if (bossType === 'BOSS_1') { 
          attackPattern = 'SLAM'; 
        } else if (bossType === 'BOSS_2') {
          attackPattern = 'LASER';
          color = '#1e1b4b'; 
          borderColor = '#818cf8';
        } else {
          attackPattern = 'SPIRAL';
          color = '#450a0a';
          borderColor = '#facc15';
        }
    } else {
        if (time < 60) {
            if (r < 0.8) { type = 'NORM_1'; hp=40; speed=130; } 
            else { type = 'NORM_2'; hp=60; speed=150; color='#86efac'; size=25; }
        } else if (time < 180) {
            if (r < 0.6) { type = 'NORM_2'; hp=80; speed=160; color='#86efac'; }
            else if (r < 0.85) { type = 'EXPLODER'; aiType = 'KAMIKAZE'; hp=50; speed=300; color='#f97316'; size=28; dmg=80; }
            else { type = 'ELITE'; hp=400; speed=110; size=45; color='#16a34a'; borderColor='#fff'; dmg=30; }
        } else {
            if (r < 0.4) { type = 'NORM_2'; hp=120; speed=180; color='#86efac'; }
            else if (r < 0.6) { 
              type = 'SHOOTER'; aiType = 'RANGED'; hp=90; speed=120; color='#a855f7'; size=35; 
              attackRange = 450; attackPattern = 'BURST'; 
            }
            else if (r < 0.8) { type = 'EXPLODER'; aiType = 'KAMIKAZE'; hp=80; speed=350; color='#f97316'; size=28; dmg=100; }
            else { type = 'ELITE'; hp=800; speed=120; size=55; color='#dc2626'; borderColor='#fff'; dmg=50; }
        }
    }

    hp *= scale; dmg *= scale;

    const newEnemy: Enemy = {
      id: Math.random().toString(),
      x, y, width: size, height: size,
      type, aiType, hp, maxHP: hp, speed, damage: dmg, color, borderColor,
      flashTime: 0,
      attackRange, attackPattern, attackState, stateTimer,
      burstCount: 0,
      isCharging: false,
      rotationSpeed: 0,
      laserAngle: 0
    };

    enemiesRef.current.push(newEnemy);
    if (bossType) setActiveBoss(newEnemy);
  }, []);

  const createHitEffect = (x: number, y: number, color: string, damage: number, isCrit = false) => {
    particlesRef.current.push({
      id: Math.random().toString(),
      x, y, width: 0, height: 0,
      vx: 0, vy: 0,
      life: 0.25, maxLife: 0.25,
      color: isCrit ? '#fcd34d' : '#fff',
      size: isCrit ? 20 : 10,
      type: 'SHOCKWAVE',
      drag: 0,
      growth: isCrit ? 300 : 200
    });

    const particleCount = 5 + Math.floor(damage / 10);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = getRandomRange(100, 400);
      particlesRef.current.push({
        id: Math.random().toString(),
        x, y, width: 0, height: 0,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: getRandomRange(0.3, 0.6), maxLife: 0.6,
        color: Math.random() > 0.5 ? color : (isCrit ? '#fcd34d' : '#fff'),
        size: getRandomRange(3, 7),
        type: 'SQUARE',
        drag: 0.85, 
        growth: -8,
        rotation: Math.random() * Math.PI,
        vRot: getRandomRange(-10, 10)
      });
    }

    floatingTextsRef.current.push({
      id: Math.random().toString(),
      x, y: y - 25, 
      text: Math.ceil(damage).toString(), 
      color: color === '#000' ? '#000' : (isCrit ? '#f59e0b' : '#fff'), 
      life: 0.8, vx: getRandomRange(-2, 2), vy: -5
    });
  };

  const createShellCasing = (x: number, y: number, angle: number) => {
      const perp = angle + Math.PI/2 + getRandomRange(-0.2, 0.2);
      const speed = getRandomRange(150, 250);
      particlesRef.current.push({
          id: Math.random().toString(),
          x, y, width: 6, height: 3,
          vx: Math.cos(perp) * speed, vy: Math.sin(perp) * speed,
          life: 0.6, maxLife: 0.6,
          color: '#fbbf24',
          size: 4, type: 'SHELL',
          drag: 0.9, growth: 0,
          rotation: angle, vRot: getRandomRange(-15, 15)
      });
  };

  const createMuzzleFlash = (x: number, y: number, angle: number) => {
      particlesRef.current.push({
          id: Math.random().toString(),
          x: x + Math.cos(angle) * 20, y: y + Math.sin(angle) * 20,
          width: 0, height: 0,
          vx: Math.cos(angle) * 50, vy: Math.sin(angle) * 50,
          life: 0.1, maxLife: 0.1,
          color: '#fef3c7',
          size: 25, type: 'MUZZLE',
          drag: 0, growth: 100,
          rotation: angle
      });
  };

  const createMagicSparkle = (x: number, y: number) => {
     if (Math.random() > 0.3) return;
     particlesRef.current.push({
        id: Math.random().toString(),
        x: x + getRandomRange(-10, 10), y: y + getRandomRange(-10, 10),
        width: 0, height: 0,
        vx: getRandomRange(-10, 10), vy: getRandomRange(-10, 10),
        life: 0.6, maxLife: 0.6,
        color: '#c084fc',
        size: getRandomRange(3, 6), type: 'STAR',
        drag: 0.95, growth: -3,
        rotation: Math.random() * Math.PI, vRot: getRandomRange(-2, 2)
     });
  };

  const createSimpleParticles = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = getRandomRange(50, 250);
          particlesRef.current.push({
              id: Math.random().toString(),
              x, y, width: 0, height: 0,
              vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
              life: getRandomRange(0.3, 0.6), maxLife: 0.6,
              color: color,
              size: getRandomRange(3, 6),
              type: 'SQUARE',
              drag: 0.85, growth: -5,
              rotation: Math.random() * Math.PI, vRot: getRandomRange(-10, 10)
          });
      }
  };

  const takeDamage = useCallback((amount: number) => {
    if (iFrameRef.current > 0) return;
    setStats(prev => {
      let dmg = amount;
      if (prev.currentArmor > 0) {
        const absorb = Math.min(prev.currentArmor, dmg);
        prev.currentArmor -= absorb;
        dmg -= absorb;
      }
      if (dmg > 0) {
        const actualDmg = Math.max(1, dmg - prev.armor);
        prev.hp -= actualDmg;
        shakeManager.current.shake(actualDmg * 0.5);
        createHitEffect(playerRef.current.x, playerRef.current.y, '#ef4444', actualDmg, true);
      }
      return { ...prev };
    });
    iFrameRef.current = 0.5;
  }, []);

  const handleLevelUp = useCallback(() => {
    const distinctOptions: Buff[] = [];
    const usedIndices = new Set<number>();
    while (distinctOptions.length < 3 && usedIndices.size < BUFFS.length) {
       const idx = Math.floor(Math.random() * BUFFS.length);
       if (!usedIndices.has(idx)) {
         usedIndices.add(idx);
         distinctOptions.push(BUFFS[idx]);
       }
    }
    setLevelUpOptions(distinctOptions);
    setGameState(GameState.LEVEL_UP);
  }, []);

  const handleBuffSelect = (buff: Buff) => {
    setSelectedBuff(buff);
    const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuestion(q);
    setGameState(GameState.QUIZ);
  };

  const handleQuizResult = (correct: boolean) => {
     if (correct && selectedBuff) {
       setStats(prev => selectedBuff.effect(prev));
     } else {
       setStats(prev => ({ ...prev, hp: Math.min(prev.maxHP, prev.hp + (prev.maxHP * 0.1)) }));
     }
     setGameState(GameState.PLAYING);
     lastTimeRef.current = performance.now();
  };

  const update = useCallback((deltaTime: number) => {
    if (gameState !== GameState.PLAYING) return;
    const dt = deltaTime / 1000;
    gameTimeRef.current += dt;
    setTimer(Math.floor(gameTimeRef.current));
    shakeManager.current.update();

    const s = statsRef.current;

    // --- ZONE LOGIC ---
    if (s.level % 10 === 0 && s.level > zoneRef.current.lastTriggeredLevel && !zoneRef.current.active) {
      zoneRef.current.active = true;
      zoneRef.current.lastTriggeredLevel = s.level;
      zoneRef.current.radius = 1200;
      zoneRef.current.center = { x: playerRef.current.x, y: playerRef.current.y };
      floatingTextsRef.current.push({
        id: 'zone_warning', x: playerRef.current.x, y: playerRef.current.y - 100,
        text: 'VÒNG BO ĐANG THU HẸP!', color: 'red', life: 3, vx: 0, vy: -1
      });
    }

    if (zoneRef.current.active) {
      zoneRef.current.radius -= 30 * dt; 
      if (zoneRef.current.radius < 200) zoneRef.current.active = false;
    }

    // --- PLAYER MOVEMENT ---
    let dx = 0, dy = 0;
    if (keysRef.current['w'] || keysRef.current['arrowup']) dy -= 1;
    if (keysRef.current['s'] || keysRef.current['arrowdown']) dy += 1;
    if (keysRef.current['a'] || keysRef.current['arrowleft']) dx -= 1;
    if (keysRef.current['d'] || keysRef.current['arrowright']) dx += 1;

    let nextX = playerRef.current.x;
    let nextY = playerRef.current.y;

    if (dx !== 0 || dy !== 0) {
      const length = Math.sqrt(dx * dx + dy * dy);
      nextX += (dx / length) * s.moveSpeed * dt;
      nextY += (dy / length) * s.moveSpeed * dt;
    }

    if (zoneRef.current.active) {
      const distToCenter = getDistance(nextX, nextY, zoneRef.current.center.x, zoneRef.current.center.y);
      if (distToCenter > zoneRef.current.radius) {
        const angle = Math.atan2(nextY - zoneRef.current.center.y, nextX - zoneRef.current.center.x);
        nextX = zoneRef.current.center.x + Math.cos(angle) * zoneRef.current.radius;
        nextY = zoneRef.current.center.y + Math.sin(angle) * zoneRef.current.radius;
      }
    }
    playerRef.current.x = nextX;
    playerRef.current.y = nextY;

    // --- ENEMY SPAWNING ---
    spawnTimerRef.current += dt;
    const spawnInterval = Math.max(0.05, 0.5 - (s.level * 0.01) - (gameTimeRef.current * 0.0005));
    if (spawnTimerRef.current >= spawnInterval) {
      spawnEnemy();
      spawnTimerRef.current = 0;
    }

    // --- PLAYER ATTACK: GUN ---
    weaponTimersRef.current.gun += dt;
    if (weaponTimersRef.current.gun >= (0.6 * s.gunCooldownMult)) {
      let nearest: Enemy | null = null;
      let minDist = 800;
      enemiesRef.current.forEach(e => {
        const d = getDistance(playerRef.current.x, playerRef.current.y, e.x, e.y);
        if (d < minDist) { minDist = d; nearest = e; }
      });

      if (nearest) {
        const baseAngle = Math.atan2((nearest as Enemy).y - playerRef.current.y, (nearest as Enemy).x - playerRef.current.x);
        const bulletCount = Math.max(1, s.gunAmount);
        const bulletSize = 14 * Math.max(1, s.gunDamageMult * 0.8);

        createMuzzleFlash(playerRef.current.x, playerRef.current.y, baseAngle);

        for(let i=0; i<bulletCount; i++) {
            const spread = (i - (bulletCount-1)/2) * 0.15; 
            const finalAngle = baseAngle + spread;
            projectilesRef.current.push({
                id: Math.random().toString(),
                x: playerRef.current.x, y: playerRef.current.y,
                width: bulletSize, height: bulletSize,
                vx: Math.cos(finalAngle) * 900, vy: Math.sin(finalAngle) * 900,
                damage: 20 * s.gunDamageMult,
                life: 1.5, rotation: finalAngle, type: 'PLAYER_BULLET',
                pierce: s.gunPierce,
                color: '#fbbf24'
            });
            createShellCasing(playerRef.current.x, playerRef.current.y, finalAngle);
        }
        weaponTimersRef.current.gun = 0;
      }
    }

    // --- PLAYER ATTACK: LIGHTNING (ENHANCED) ---
    weaponTimersRef.current.lightning += dt;
    if (s.lightningAmount > 0 && weaponTimersRef.current.lightning >= (2.0 * s.lightningCooldownMult)) {
       const visibleEnemies = enemiesRef.current.filter(e => 
          getDistance(playerRef.current.x, playerRef.current.y, e.x, e.y) < 900
       );
       
       if (visibleEnemies.length > 0) {
          const targets: Enemy[] = [];
          const count = s.lightningAmount;
          const pool = [...visibleEnemies];
          for(let i=0; i<count; i++) {
             if (pool.length === 0) break;
             const idx = Math.floor(Math.random() * pool.length);
             targets.push(pool.splice(idx, 1)[0]);
          }

          targets.forEach(e => {
             const dmg = 40 * s.lightningDamageMult;
             e.hp -= dmg;
             e.flashTime = 0.2;
             
             // --- Enhanced Path Generation ---
             const startX = e.x + getRandomRange(-150, 150);
             const startY = e.y - 700;
             const path = [{x: startX, y: startY}];
             const branches: {x: number, y: number}[][] = [];
             
             const segments = 12;
             const dy = (e.y - startY) / segments;
             const dxTotal = e.x - startX;
             
             for(let k=1; k<=segments; k++) {
                const progress = k / segments;
                const targetX = startX + dxTotal * progress;
                const targetY = startY + dy * k;
                const jitter = k === segments ? 0 : getRandomRange(-40, 40);
                const pt = { x: targetX + jitter, y: targetY };
                path.push(pt);

                // Spawn a branch (30% chance)
                if (k < segments - 2 && Math.random() < 0.3) {
                    const branchLength = getRandomRange(3, 6);
                    const branchPath = [{...pt}];
                    let bx = pt.x;
                    let by = pt.y;
                    const bDx = getRandomRange(-30, 30);
                    for(let b=0; b<branchLength; b++) {
                        bx += bDx + getRandomRange(-10, 10);
                        by += dy * 0.7;
                        branchPath.push({x: bx, y: by});
                    }
                    branches.push(branchPath);
                }
             }

             // FLASH PARTICLE
             particlesRef.current.push({
                 id: Math.random().toString(), x: e.x, y: e.y, width:0, height:0,
                 vx:0, vy:0, life:0.1, maxLife:0.1, color: '#fff', size: 300,
                 type: 'FLASH', drag:0, growth:0
             });

             particlesRef.current.push({
                 id: Math.random().toString(), x: e.x, y: e.y, width:0, height:0,
                 vx:0, vy:0, life: 0.35, maxLife: 0.35, 
                 color: '#67e8f9', // Bright Cyan
                 size: 10 * s.lightningArea,
                 type: 'LIGHTNING', drag: 0, growth: 0, 
                 path: path,
                 branches: branches
             });

             // Enhanced Explosion
             particlesRef.current.push({
                 id: Math.random().toString(), x: e.x, y: e.y, width:0, height:0,
                 vx:0, vy:0, life:0.4, maxLife:0.4, color: '#67e8f9', size: 80 * s.lightningArea,
                 type: 'SHOCKWAVE', drag:0, growth: 150
             });
             // Sparks
             createSimpleParticles(e.x, e.y, '#bae6fd', 15);

             createHitEffect(e.x, e.y, '#22d3ee', dmg, true);
          });
          
          if (targets.length > 0) shakeManager.current.shake(5 * targets.length);
          weaponTimersRef.current.lightning = 0;
       }
    }

    // --- PLAYER ATTACK: BOOKS ---
    const orbitalSpeed = 3.0 * s.bookSpeed;
    const orbitalRadius = 160 * s.bookArea;
    const bookCount = s.bookAmount;
    const bookDamage = 15 * s.bookDamageMult * dt * 8; 
    const bookSize = 24 * s.bookArea * Math.max(1, s.bookDamageMult * 0.7);

    for(let i=0; i < bookCount; i++) {
        const angle = (gameTimeRef.current * orbitalSpeed) + (i * (Math.PI * 2 / bookCount));
        const bx = playerRef.current.x + Math.cos(angle) * orbitalRadius;
        const by = playerRef.current.y + Math.sin(angle) * orbitalRadius;
        
        createMagicSparkle(bx, by);

        enemiesRef.current.forEach(e => {
             if (checkCircleCollision(bx, by, bookSize, e.x, e.y, e.width/2)) {
                 e.hp -= bookDamage;
                 if (e.aiType !== 'BOSS') {
                     const pushAngle = Math.atan2(e.y - playerRef.current.y, e.x - playerRef.current.x);
                     e.x += Math.cos(pushAngle) * 2; 
                     e.y += Math.sin(pushAngle) * 2;
                 }
                 if (Math.random() > 0.85) {
                     e.flashTime = 0.15;
                     createHitEffect(e.x, e.y, '#a78bfa', bookDamage * 5, true); 
                 }
             }
        });
    }

    // --- PROJECTILES UPDATE ---
    projectilesRef.current.forEach(p => {
      // Homing Logic
      if (p.isHoming) {
          let targetX = playerRef.current.x;
          let targetY = playerRef.current.y;
          
          const angleToTarget = Math.atan2(targetY - p.y, targetX - p.x);
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          // Stronger steering for smarter bullets
          const steer = 0.05 * (p.homingForce || 1);
          const targetVx = Math.cos(angleToTarget) * currentSpeed;
          const targetVy = Math.sin(angleToTarget) * currentSpeed;
          
          p.vx += (targetVx - p.vx) * steer; 
          p.vy += (targetVy - p.vy) * steer;
          p.rotation = Math.atan2(p.vy, p.vx);
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;

      // Trail
      if (p.type === 'PLAYER_BULLET' && Math.random() > 0.6) {
           particlesRef.current.push({
               id: Math.random().toString(),
               x: p.x, y: p.y, width: 0, height: 0,
               vx: 0, vy: 0, life: 0.2, maxLife: 0.2,
               color: 'rgba(251, 191, 36, 0.5)', size: p.width/2,
               type: 'DOT', drag: 0, growth: -5
           });
      }

      if (p.type === 'PLAYER_BULLET') {
          enemiesRef.current.forEach(e => {
            if (checkCircleCollision(p.x, p.y, p.width/2, e.x, e.y, e.width/2)) {
               e.hp -= p.damage;
               e.flashTime = 0.15;
               if (e.aiType !== 'BOSS') {
                   const knockbackAmt = 15;
                   e.x += Math.cos(p.rotation) * knockbackAmt;
                   e.y += Math.sin(p.rotation) * knockbackAmt;
               }
               createHitEffect(p.x, p.y, '#fbbf24', p.damage, false);
               if (p.pierce > 0) p.pierce -= 1; else p.life = 0;
            }
          });
      } else if (p.type === 'ENEMY_BULLET') {
          if (checkCircleCollision(p.x, p.y, p.width/2, playerRef.current.x, playerRef.current.y, playerRef.current.size/2)) {
               takeDamage(p.damage);
               p.life = 0;
               createHitEffect(playerRef.current.x, playerRef.current.y, '#ef4444', 0, true);
          }
      }
    });
    projectilesRef.current = projectilesRef.current.filter(p => p.life > 0);

    // --- ENEMIES UPDATE ---
    enemiesRef.current.forEach(e => {
      const dist = getDistance(playerRef.current.x, playerRef.current.y, e.x, e.y);
      let moveSpeed = e.speed;
      let shouldMove = true;
      
      e.stateTimer = (e.stateTimer || 0) + dt;

      // === BOSS AI LOGIC ===

      // 1. BOSS 1: GROUND SLAM
      if (e.attackPattern === 'SLAM') {
          if (e.attackState === 'IDLE' || !e.attackState) {
              if (e.stateTimer > 4) { 
                  e.attackState = 'WARN'; e.stateTimer = 0;
              }
          } 
          else if (e.attackState === 'WARN') {
              shouldMove = false;
              if (e.stateTimer > 1.5) { 
                  e.attackState = 'FIRING'; e.stateTimer = 0;
              }
          }
          else if (e.attackState === 'FIRING') {
              shouldMove = false;
              shakeManager.current.shake(20);
              createSimpleParticles(e.x, e.y, '#ef4444', 50);
              particlesRef.current.push({
                 id: Math.random().toString(), x: e.x, y: e.y, width:0, height:0,
                 vx:0, vy:0, life:0.5, maxLife:0.5, color: '#ef4444', size: 300, type: 'SHOCKWAVE', drag:0, growth: 1000
              });
              if (dist < 300) takeDamage(40);
              e.attackState = 'COOLDOWN'; e.stateTimer = 0;
          }
          else if (e.attackState === 'COOLDOWN') {
              if (e.stateTimer > 1.0) { e.attackState = 'IDLE'; e.stateTimer = 0; }
          }
      }
      
      // 2. BOSS 2: LASER
      else if (e.attackPattern === 'LASER') {
          // IDLE -> WARN (Tracking) -> CHARGING (Lock) -> FIRING -> COOLDOWN
          if (e.attackState === 'IDLE' || !e.attackState) {
              if (e.stateTimer > 3) {
                  e.attackState = 'WARN';
                  e.stateTimer = 0;
                  e.secondaryTimer = 0; // Use for pulsing sound or visual
              }
          }
          else if (e.attackState === 'WARN') {
             // Track player
             const angle = Math.atan2(playerRef.current.y - e.y, playerRef.current.x - e.x);
             e.laserAngle = angle;
             shouldMove = false;
             if (e.stateTimer > 1.5) {
                 e.attackState = 'CHARGING';
                 e.stateTimer = 0;
             }
          }
          else if (e.attackState === 'CHARGING') {
              shouldMove = false;
              // Laser locked, gathering energy
              if (Math.random() > 0.5) {
                 const lx = e.x + Math.cos(e.laserAngle || 0) * getRandomRange(0, 800);
                 const ly = e.y + Math.sin(e.laserAngle || 0) * getRandomRange(0, 800);
                 particlesRef.current.push({
                     id: Math.random().toString(), x: lx, y: ly, width:0, height:0,
                     vx: (e.x - lx) * 2, vy: (e.y - ly) * 2, // Suck in
                     life: 0.5, maxLife: 0.5, color: '#818cf8', size: 4, type: 'DOT', drag: 0, growth: 0
                 });
              }
              if (e.stateTimer > 0.8) {
                  e.attackState = 'FIRING';
                  e.stateTimer = 0;
                  shakeManager.current.shake(10);
              }
          }
          else if (e.attackState === 'FIRING') {
              shouldMove = false;
              // Collision Logic: Point to Line Segment
              const beamLen = 1500;
              const x2 = e.x + Math.cos(e.laserAngle || 0) * beamLen;
              const y2 = e.y + Math.sin(e.laserAngle || 0) * beamLen;
              
              // Math for dist from player to line (e.x,e.y) -> (x2,y2)
              const A = playerRef.current.x - e.x;
              const B = playerRef.current.y - e.y;
              const C = x2 - e.x;
              const D = y2 - e.y;
              
              const dot = A * C + B * D;
              const len_sq = C * C + D * D;
              let param = -1;
              if (len_sq !== 0) param = dot / len_sq;
              
              let xx, yy;
              if (param < 0) { xx = e.x; yy = e.y; }
              else if (param > 1) { xx = x2; yy = y2; }
              else { xx = e.x + param * C; yy = e.y + param * D; }
              
              const distToLine = Math.sqrt(Math.pow(playerRef.current.x - xx, 2) + Math.pow(playerRef.current.y - yy, 2));
              
              if (distToLine < 40) { // Beam width approx
                  takeDamage(2); // Rapid low damage
              }

              if (e.stateTimer > 2.0) {
                  e.attackState = 'COOLDOWN';
                  e.stateTimer = 0;
              }
          }
          else if (e.attackState === 'COOLDOWN') {
              if (e.stateTimer > 2.0) { e.attackState = 'IDLE'; e.stateTimer = 0; }
          }
      }

      // 3. BOSS 3: SPIRAL
      else if (e.attackPattern === 'SPIRAL') {
          // Continuous firing while rotating
          shouldMove = false;
          e.rotationSpeed = (e.rotationSpeed || 0) + dt * 0.1; // Accelerate spin
          e.laserAngle = (e.laserAngle || 0) + 1.5 * dt; // Using laserAngle as generic rotation var
          
          e.secondaryTimer = (e.secondaryTimer || 0) + dt;
          if (e.secondaryTimer > 0.1) { // Fire rate
              const arms = 4;
              for(let i=0; i<arms; i++) {
                 const angle = (e.laserAngle || 0) + (Math.PI * 2 / arms) * i;
                 projectilesRef.current.push({
                      id: Math.random().toString(), x: e.x, y: e.y, width: 20, height: 20,
                      vx: Math.cos(angle) * 300, vy: Math.sin(angle) * 300,
                      damage: e.damage, life: 5, rotation: angle, type: 'ENEMY_BULLET', pierce: 0,
                      color: '#facc15'
                  });
              }
              e.secondaryTimer = 0;
          }
      }

      // --- OTHER PATTERNS (NOVA, BURST) ---
      else if (e.attackPattern === 'NOVA') {
          if (e.stateTimer > 3.0) {
              const bulletCount = 12;
              for(let i=0; i<bulletCount; i++) {
                  const angle = (Math.PI * 2 / bulletCount) * i;
                  projectilesRef.current.push({
                      id: Math.random().toString(), x: e.x, y: e.y, width: 25, height: 25,
                      vx: Math.cos(angle) * 350, vy: Math.sin(angle) * 350,
                      damage: e.damage, life: 5, rotation: angle, type: 'ENEMY_BULLET', pierce: 0,
                      color: '#a855f7', isHoming: false
                  });
              }
              e.stateTimer = 0;
          }
      }

      // Burst Logic
      if (e.attackPattern === 'BURST' && dist < (e.attackRange || 500)) {
          if (e.attackState !== 'FIRING') {
              if (e.stateTimer > 2.0) {
                  e.attackState = 'FIRING';
                  e.burstCount = 3;
                  e.stateTimer = 0;
                  e.secondaryTimer = 0;
              }
          } else {
              e.secondaryTimer = (e.secondaryTimer || 0) + dt;
              if (e.secondaryTimer > 0.15) { 
                   const angle = Math.atan2(playerRef.current.y - e.y, playerRef.current.x - e.x);
                   projectilesRef.current.push({
                      id: Math.random().toString(), x: e.x, y: e.y, width: 20, height: 20,
                      vx: Math.cos(angle) * 450, vy: Math.sin(angle) * 450,
                      damage: e.damage, life: 3, rotation: angle, type: 'ENEMY_BULLET', pierce: 0,
                      color: '#ef4444'
                   });
                   e.burstCount = (e.burstCount || 0) - 1;
                   e.secondaryTimer = 0;
                   if (e.burstCount <= 0) {
                       e.attackState = 'IDLE';
                       e.stateTimer = 0;
                   }
              }
          }
      }

      // --- MOVEMENT ---
      if (shouldMove) {
          if (e.aiType === 'RANGED' || (e.aiType === 'BOSS' && e.type === 'BOSS_2')) {
               if (dist > (e.attackRange || 400)) {
                   const angle = Math.atan2(playerRef.current.y - e.y, playerRef.current.x - e.x);
                   e.x += Math.cos(angle) * moveSpeed * dt;
                   e.y += Math.sin(angle) * moveSpeed * dt;
               }
          } 
          else if (e.aiType === 'KAMIKAZE') {
              if (dist < 100 && !e.isCharging) {
                 e.isCharging = true;
                 e.attackTimer = 0;
              }
              if (e.isCharging) {
                 e.attackTimer = (e.attackTimer || 0) + dt;
                 e.color = Math.floor(gameTimeRef.current * 20) % 2 === 0 ? '#fff' : '#ef4444';
                 if ((e.attackTimer || 0) > 1.0) {
                     createSimpleParticles(e.x, e.y, '#ef4444', 30);
                     shakeManager.current.shake(10);
                     if (dist < 150) takeDamage(e.damage);
                     e.hp = 0; 
                 }
              } else {
                 const angle = Math.atan2(playerRef.current.y - e.y, playerRef.current.x - e.x);
                 e.x += Math.cos(angle) * moveSpeed * dt;
                 e.y += Math.sin(angle) * moveSpeed * dt;
              }
          }
          else {
              const angle = Math.atan2(playerRef.current.y - e.y, playerRef.current.x - e.x);
              e.x += Math.cos(angle) * moveSpeed * dt;
              e.y += Math.sin(angle) * moveSpeed * dt;
          }
      }

      // Basic Collision
      if (e.flashTime > 0) e.flashTime -= dt;
      if (e.aiType !== 'KAMIKAZE' && iFrameRef.current <= 0 && checkCircleCollision(playerRef.current.x, playerRef.current.y, playerRef.current.size/2, e.x, e.y, e.width/2)) {
         takeDamage(e.damage);
      }
    });
    if (iFrameRef.current > 0) iFrameRef.current -= dt;

    // --- DEATH & DROPS ---
    enemiesRef.current.forEach(e => {
      if (e.hp <= 0) {
        if (e.aiType !== 'KAMIKAZE') {
            setStats(prev => ({ ...prev, kills: prev.kills + 1 }));
            let xpAmount = 25; let xpSize = 12; let heartChance = 0.01; let healAmount = 10;
            if (e.type.includes('BOSS')) { xpAmount = 2000; xpSize = 24; heartChance = 1.0; healAmount = 100; } 
            else if (e.type === 'ELITE') { xpAmount = 200; xpSize = 16; heartChance = 0.15; healAmount = 40; } 
            else if (e.type === 'EXPLODER') { xpAmount = 40; xpSize = 12; heartChance = 0.02; healAmount = 15; }
            gemsRef.current.push({
              id: Math.random().toString(), x: e.x, y: e.y, width: xpSize, height: xpSize,
              amount: xpAmount, color: 'oklch(0.5635 0.2408 260.8178)'
            });
            if (Math.random() < heartChance) {
                healthDropsRef.current.push({
                    id: Math.random().toString(), x: e.x + getRandomRange(-20, 20), y: e.y + getRandomRange(-20, 20),
                    width: 24, height: 24, healAmount, life: 30
                });
            }
        }
        createHitEffect(e.x, e.y, e.color, 0, true); 
        if (activeBoss && e.id === activeBoss.id) setActiveBoss(null);
      }
    });
    enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);

    // --- GEM / ITEM COLLECTION ---
    gemsRef.current.forEach(g => {
      const dist = getDistance(playerRef.current.x, playerRef.current.y, g.x, g.y);
      if (dist < s.magnetRange) {
        const angle = Math.atan2(playerRef.current.y - g.y, playerRef.current.x - g.x);
        g.x += Math.cos(angle) * 800 * dt;
        g.y += Math.sin(angle) * 800 * dt;
      }
      if (dist < 30) {
        setStats(prev => {
          const newExp = prev.exp + g.amount; 
          if (newExp >= prev.expToNext) {
            handleLevelUp();
            return { 
                ...prev, 
                exp: newExp - prev.expToNext, 
                expToNext: Math.floor(prev.expToNext * 1.3), 
                level: prev.level + 1,
                hp: Math.min(prev.maxHP, prev.hp + prev.maxHP * 0.1),
                currentArmor: prev.maxArmor 
            };
          }
          return { ...prev, exp: newExp };
        });
        g.amount = 0;
      }
    });
    gemsRef.current = gemsRef.current.filter(g => g.amount > 0);

    healthDropsRef.current.forEach(h => {
        h.life -= dt;
        const dist = getDistance(playerRef.current.x, playerRef.current.y, h.x, h.y);
        if (dist < 35) {
             setStats(prev => ({ ...prev, hp: Math.min(prev.maxHP, prev.hp + h.healAmount) }));
             floatingTextsRef.current.push({
                id: Math.random().toString(), x: playerRef.current.x, y: playerRef.current.y - 40,
                text: `+${h.healAmount} HP`, color: '#22c55e', life: 1.0, vx: 0, vy: -3
             });
             h.life = 0;
        }
    });
    healthDropsRef.current = healthDropsRef.current.filter(h => h.life > 0);

    if (activeBoss) {
        const bossRef = enemiesRef.current.find(e => e.id === activeBoss.id);
        if (bossRef) setActiveBoss({...bossRef}); 
        else setActiveBoss(null);
    }

    floatingTextsRef.current.forEach(ft => { ft.x += ft.vx; ft.y += ft.vy; ft.life -= dt; });
    floatingTextsRef.current = floatingTextsRef.current.filter(ft => ft.life > 0);
    
    // UPDATE PARTICLES with Physics
    particlesRef.current.forEach(p => { 
        p.x += p.vx * dt; 
        p.y += p.vy * dt; 
        p.vx *= p.drag; 
        p.vy *= p.drag;
        p.size += p.growth * dt;
        p.life -= dt; 
        if (p.vRot) p.rotation = (p.rotation || 0) + p.vRot * dt; 
    });
    particlesRef.current = particlesRef.current.filter(p => p.life > 0 && p.size > 0);

    if (s.hp <= 0) handleGameOver();
  }, [gameState, spawnEnemy, activeBoss, takeDamage, handleLevelUp]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const offsets = shakeManager.current.getOffsets();
    const camX = playerRef.current.x - CANVAS_WIDTH / 2 + offsets.x;
    const camY = playerRef.current.y - CANVAS_HEIGHT / 2 + offsets.y;

    ctx.save();
    ctx.translate(-camX, -camY);

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(camX, camY, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    const gridSize = 120;
    const startX = Math.floor(camX / gridSize) * gridSize;
    const startY = Math.floor(camY / gridSize) * gridSize;
    for(let x = startX; x < camX + CANVAS_WIDTH + gridSize; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, camY); ctx.lineTo(x, camY + CANVAS_HEIGHT); ctx.stroke();
    }
    for(let y = startY; y < camY + CANVAS_HEIGHT + gridSize; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(camX, y); ctx.lineTo(camX + CANVAS_WIDTH, y); ctx.stroke();
    }

    if (zoneRef.current.active) {
        const { center, radius } = zoneRef.current;
        ctx.beginPath(); ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 10; ctx.strokeStyle = `rgba(239, 68, 68, ${0.5 + Math.sin(gameTimeRef.current * 10) * 0.2})`; ctx.stroke();
        ctx.beginPath(); ctx.rect(camX - 100, camY - 100, CANVAS_WIDTH + 200, CANVAS_HEIGHT + 200);
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)'; ctx.fill();
    }

    gemsRef.current.forEach(g => {
      const size = g.width; 
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(g.x+3, g.y+3, size/2, 0, Math.PI*2); ctx.fill(); 
      ctx.fillStyle = g.color; ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.x, g.y, size/2, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    });

    healthDropsRef.current.forEach(h => {
        const scale = 1 + Math.sin(gameTimeRef.current * 8) * 0.1;
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.scale(scale, scale);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath(); ctx.arc(2, 4, 10, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♥', 0, 0);
        ctx.restore();
    });

    enemiesRef.current.forEach(e => {
      // --- BOSS 1: SLAM WARNING ---
      if (e.attackPattern === 'SLAM' && e.attackState === 'WARN') {
          const progress = (e.stateTimer || 0) / 1.5;
          ctx.save(); ctx.translate(e.x, e.y);
          ctx.beginPath(); ctx.arc(0, 0, 300, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, 0.2)`; ctx.fill();
          ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke();
          ctx.beginPath(); ctx.arc(0, 0, 300 * progress, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, 0.4)`; ctx.fill();
          ctx.restore();
      }
      
      // --- BOSS 2: LASER DRAWING ---
      if (e.attackPattern === 'LASER') {
          const laserLen = 1500;
          if (e.attackState === 'WARN' || e.attackState === 'CHARGING') {
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(e.x, e.y);
              ctx.lineTo(e.x + Math.cos(e.laserAngle || 0) * laserLen, e.y + Math.sin(e.laserAngle || 0) * laserLen);
              ctx.strokeStyle = `rgba(255, 0, 0, ${e.attackState === 'CHARGING' ? 0.8 : 0.2})`;
              ctx.lineWidth = e.attackState === 'CHARGING' ? 3 : 1;
              ctx.setLineDash([10, 10]);
              ctx.stroke();
              ctx.restore();
          } 
          else if (e.attackState === 'FIRING') {
              // Main Beam
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(e.x, e.y);
              ctx.lineTo(e.x + Math.cos(e.laserAngle || 0) * laserLen, e.y + Math.sin(e.laserAngle || 0) * laserLen);
              
              // Glow
              ctx.shadowBlur = 20; ctx.shadowColor = '#818cf8';
              ctx.lineWidth = getRandomRange(40, 60);
              ctx.strokeStyle = 'rgba(67, 56, 202, 0.5)';
              ctx.stroke();
              
              // Core
              ctx.shadowBlur = 0;
              ctx.lineWidth = getRandomRange(10, 20);
              ctx.strokeStyle = '#e0e7ff';
              ctx.stroke();
              ctx.restore();
          }
      }

      if (e.aiType === 'KAMIKAZE') {
          ctx.beginPath(); ctx.arc(e.x, e.y, 80, 0, Math.PI*2);
          ctx.strokeStyle = `rgba(239, 68, 68, ${e.isCharging ? 0.8 : 0.1})`;
          ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
      }
      
      ctx.save();
      ctx.translate(e.x, e.y);
      if (e.flashTime > 0) {
          ctx.translate((Math.random()-0.5)*4, (Math.random()-0.5)*4);
          ctx.scale(0.95, 0.95);
      }

      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(-e.width/2 + 6, -e.height/2 + 6, e.width, e.height);
      ctx.fillStyle = e.flashTime > 0 ? '#fff' : e.color;
      ctx.strokeStyle = e.borderColor;
      ctx.lineWidth = e.aiType === 'BOSS' ? 8 : (e.type === 'ELITE' ? 6 : 4);
      ctx.fillRect(-e.width/2, -e.height/2, e.width, e.height);
      ctx.strokeRect(-e.width/2, -e.height/2, e.width, e.height);
      ctx.fillStyle = e.aiType === 'BOSS' ? '#ef4444' : '#000';
      const eyeSize = e.width * 0.15; const eyeOffset = e.width * 0.2;
      ctx.fillRect(-eyeOffset - eyeSize/2, -5, eyeSize, eyeSize);
      ctx.fillRect(eyeOffset - eyeSize/2, -5, eyeSize, eyeSize);
      
      ctx.restore();

      if (e.hp < e.maxHP && e.aiType !== 'BOSS') { 
        const barW = e.width + 10; const barH = 6;
        const barX = e.x - barW/2; const barY = e.y - e.height/2 - 15;
        ctx.fillStyle = '#000'; ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(barX, barY, (e.hp / e.maxHP) * barW, barH);
        ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.strokeRect(barX, barY, barW, barH);
      }
    });

    const bookSize = 24 * statsRef.current.bookArea * Math.max(1, statsRef.current.bookDamageMult * 0.7);
    const orbitalRadius = 160 * statsRef.current.bookArea;
    
    // MAGIC CIRCLE
    if (statsRef.current.bookAmount > 0) {
        ctx.save(); 
        ctx.translate(playerRef.current.x, playerRef.current.y); 
        
        const pulse = 1 + Math.sin(gameTimeRef.current * 4) * 0.05;
        ctx.scale(pulse, pulse);

        ctx.save(); ctx.rotate(gameTimeRef.current * 0.5); 
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)'; 
        ctx.lineWidth = 2; ctx.setLineDash([20, 10]);
        ctx.beginPath(); ctx.arc(0, 0, orbitalRadius, 0, Math.PI*2); ctx.stroke();
        ctx.restore();

        ctx.save(); ctx.rotate(-gameTimeRef.current * 0.3);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.arc(0, 0, orbitalRadius * 0.8, 0, Math.PI*2); ctx.stroke();
        ctx.restore();
        
        ctx.rotate(gameTimeRef.current * 0.1);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
        ctx.lineWidth = 1;
        for(let k=0; k<5; k++) {
            const a = k * (Math.PI * 2 / 5);
            ctx.lineTo(Math.cos(a)*orbitalRadius*0.8, Math.sin(a)*orbitalRadius*0.8);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    for(let i=0; i < statsRef.current.bookAmount; i++) {
        const angle = (gameTimeRef.current * 3.0 * statsRef.current.bookSpeed) + (i * (Math.PI * 2 / statsRef.current.bookAmount));
        const bx = playerRef.current.x + Math.cos(angle) * orbitalRadius;
        const by = playerRef.current.y + Math.sin(angle) * orbitalRadius;
        
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = bookSize / 2;
        ctx.lineCap = 'round';
        const trailLen = 0.5;
        ctx.arc(playerRef.current.x, playerRef.current.y, orbitalRadius, angle - trailLen, angle);
        ctx.stroke();
        ctx.restore();

        ctx.save(); 
        ctx.translate(bx, by); 
        ctx.rotate(angle + Math.PI/2);
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 15;
        for(let j=1; j<=3; j++) { 
            ctx.fillStyle = `rgba(139, 92, 246, ${0.3 / j})`; 
            ctx.fillRect((-bookSize/2) - (j*4), -bookSize/2, bookSize, bookSize); 
        }
        ctx.fillStyle = '#8b5cf6'; 
        ctx.strokeStyle = '#fff'; 
        ctx.lineWidth = 2;
        ctx.fillRect(-bookSize/2, -bookSize/2, bookSize, bookSize); 
        ctx.strokeRect(-bookSize/2, -bookSize/2, bookSize, bookSize);
        ctx.fillStyle = '#fff'; 
        ctx.font = `bold ${bookSize/1.5}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⚡', 0, 0);
        ctx.restore();
    }

    projectilesRef.current.forEach(p => {
        const tailLength = p.width * 2.5;
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = p.color; 
        ctx.lineWidth = p.width / 2; 
        ctx.lineCap = 'round';
        
        // Use lighter blending for glowing projectiles
        if (p.type === 'ENEMY_BULLET') ctx.globalCompositeOperation = 'lighter';
        
        ctx.globalAlpha = 0.8;
        ctx.beginPath(); 
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(p.rotation) * tailLength, p.y - Math.sin(p.rotation) * tailLength);
        ctx.stroke(); 
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = p.type === 'ENEMY_BULLET' ? '#fff' : '#fff'; 
        ctx.beginPath(); ctx.arc(p.x, p.y, p.width/3, 0, Math.PI*2); ctx.fill();
        ctx.restore();
    });

    const pSize = playerRef.current.size;
    const px = playerRef.current.x; const py = playerRef.current.y;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(px - pSize/2 + 6, py - pSize/2 + 6, pSize, pSize);
    ctx.fillStyle = statsRef.current.currentArmor > 0 ? '#3b82f6' : '#171717'; 
    ctx.strokeStyle = '#000'; ctx.lineWidth = 5;
    ctx.fillRect(px - pSize/2, py - pSize/2, pSize, pSize); ctx.strokeRect(px - pSize/2, py - pSize/2, pSize, pSize);
    ctx.fillStyle = '#fff'; ctx.fillRect(px - 10, py - 6, 6, 6); ctx.fillRect(px + 4, py - 6, 6, 6);

    particlesRef.current.forEach(p => { 
        const alpha = p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        
        if (p.rotation) ctx.rotate(p.rotation);

        if (p.type === 'SHOCKWAVE') {
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(0, p.size), 0, Math.PI * 2);
            ctx.lineWidth = 4;
            ctx.strokeStyle = p.color;
            ctx.stroke();
        } else if (p.type === 'MUZZLE') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        } else if (p.type === 'STAR') {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            const r = p.size;
            ctx.moveTo(0, -r); ctx.quadraticCurveTo(r/4, -r/4, r, 0); ctx.quadraticCurveTo(r/4, r/4, 0, r); ctx.quadraticCurveTo(-r/4, r/4, -r, 0); ctx.quadraticCurveTo(-r/4, -r/4, 0, -r);
            ctx.fill();
        } else if (p.type === 'FLASH') {
            // Screen flash logic
            ctx.resetTransform(); // Reset to draw full screen
            const grad = ctx.createRadialGradient(p.x - (camX), p.y - (camY), 0, p.x - (camX), p.y - (camY), p.size * 2);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.globalCompositeOperation = 'screen';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.globalCompositeOperation = 'source-over';
        } else if (p.type === 'LIGHTNING' && p.path) {
            ctx.globalCompositeOperation = 'lighter';
            const drawPath = (pts: {x: number, y: number}[], width: number, alpha: number) => {
                ctx.beginPath();
                if (pts.length > 0) {
                    // Add slight jitter to start point
                    ctx.moveTo(pts[0].x + getRandomRange(-2, 2), pts[0].y + getRandomRange(-2, 2));
                }
                for(let i=1; i<pts.length; i++) {
                    ctx.lineTo(pts[i].x + getRandomRange(-2, 2), pts[i].y + getRandomRange(-2, 2));
                }
                ctx.lineWidth = width;
                ctx.stroke();
            };

            const flicker = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
            const fade = alpha; // p.life / p.maxLife
            
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // 1. Outer Glow (Big, low alpha)
            ctx.shadowBlur = 40 * fade;
            ctx.shadowColor = p.color;
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = fade * 0.5 * flicker;
            // Draw Main
            drawPath(p.path, p.size * 3, fade);
            
            // 2. Inner Glow (Bright color)
            ctx.shadowBlur = 20 * fade;
            ctx.globalAlpha = fade * 0.9 * flicker;
            drawPath(p.path, p.size * 1.2, fade);
            // Draw Branches
            if (p.branches) {
                p.branches.forEach(b => drawPath(b, p.size * 0.6, fade));
            }

            // 3. Core (White, intense)
            ctx.shadowBlur = 10;
            ctx.strokeStyle = '#fff';
            ctx.globalAlpha = fade * flicker;
            drawPath(p.path, p.size * 0.4, fade);
             if (p.branches) {
                p.branches.forEach(b => drawPath(b, p.size * 0.2, fade));
            }
            
            ctx.shadowBlur = 0;
            ctx.globalCompositeOperation = 'source-over';
        } else {
            ctx.fillStyle = p.color; 
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size); 
        }
        
        ctx.restore();
    });

    floatingTextsRef.current.forEach(ft => {
        ctx.save(); ctx.globalAlpha = ft.life; ctx.fillStyle = ft.color; ctx.font = '900 24px "Space Mono"';
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeText(ft.text, ft.x, ft.y); ctx.fillText(ft.text, ft.x, ft.y); ctx.restore();
    });

    ctx.restore();
    const grad = ctx.createRadialGradient(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH/3, CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH);
    grad.addColorStop(0, 'transparent'); grad.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  }, [stats, activeBoss]);

  const loop = useCallback((time: number) => {
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    update(deltaTime);
    draw();
    requestRef.current = requestAnimationFrame(loop);
  }, [update, draw]);

  useEffect(() => {
    const hkd = (e: KeyboardEvent) => keysRef.current[e.key.toLowerCase()] = true;
    const hku = (e: KeyboardEvent) => keysRef.current[e.key.toLowerCase()] = false;
    window.addEventListener('keydown', hkd); window.addEventListener('keyup', hku);
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('keydown', hkd); window.removeEventListener('keyup', hku);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [loop]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white flex items-center justify-center font-sans">
      
      {/* LOADING SCREEN */}
      {gameState === GameState.LOADING && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-[#171717] text-white">
           <div className="w-[400px]">
             <div className="flex justify-between text-xs font-mono mb-2">
               <span>ĐANG TẢI DỮ LIỆU...</span>
               <span>{Math.floor(loadingProgress)}%</span>
             </div>
             <div className="h-4 w-full border-2 border-white p-0.5">
               <div className="h-full bg-white transition-all duration-200" style={{width: `${loadingProgress}%`}}></div>
             </div>
             <p className="mt-4 text-center font-bold text-[#facc15] animate-pulse">
               {loadingProgress < 30 ? "Đang chuẩn bị vũ khí..." : loadingProgress < 70 ? "Đang nghiên cứu tư tưởng..." : "Sẵn sàng chiến đấu!"}
             </p>
           </div>
        </div>
      )}

      {/* START MENU */}
      {gameState === GameState.MENU && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f0f0f0] pattern-grid">
          <div className="flex flex-col items-center transform -rotate-2 mb-12 animate-pop">
            <div className="bg-black text-white px-6 py-2 border-4 border-black neo-shadow mb-4">
              <span className="font-mono text-lg tracking-[0.2em] uppercase font-bold">Phiên Bản 2.1 - Cách Mạng</span>
            </div>
            <h1 className="text-9xl font-black tracking-tighter leading-[0.85] text-center uppercase text-[oklch(0.6489_0.2370_26.9728)] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
              HÀNH TRÌNH<br/>
              <span className="text-black bg-white px-4 border-4 border-black">TƯ TƯỞNG</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-6 w-[700px]">
            <button onClick={startGame} className="col-span-2 py-8 bg-black text-white font-black text-4xl border-4 border-black neo-shadow hover:-translate-y-2 hover:-translate-x-2 transition-transform uppercase flex items-center justify-center gap-4 group">
              <Play className="w-10 h-10" strokeWidth={3} />
              <span>Bắt Đầu Ngay</span>
              <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
            </button>
            <button onClick={() => setShowHistory(true)} className="py-6 bg-white text-black font-black text-xl border-4 border-black neo-shadow hover:-translate-y-1 hover:-translate-x-1 transition-transform uppercase hover:bg-gray-50 flex items-center justify-center gap-2">
              <BarChart2 className="w-6 h-6" strokeWidth={3} />
              Lịch Sử Đấu
            </button>
            <button onClick={() => setShowTutorial(true)} className="py-6 bg-[oklch(0.9680_0.2110_109.7692)] text-black font-black text-xl border-4 border-black neo-shadow hover:-translate-y-1 hover:-translate-x-1 transition-transform uppercase flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6" strokeWidth={3} />
              Cách Chơi
            </button>
            <button onClick={() => setShowPolicy(true)} className="col-span-2 py-4 bg-gray-200 text-gray-600 font-bold text-sm border-4 border-black neo-shadow hover:bg-gray-300 uppercase flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Cam Kết Sử Dụng AI & Bảo Mật
            </button>
          </div>

          <div className="absolute bottom-8 text-xs font-mono text-gray-400">
            PHÁT TRIỂN BỞI ĐỘI NGŨ KỸ THUẬT © 2024
          </div>
        </div>
      )}

      {/* GAME OVER SCREEN */}
      {gameState === GameState.GAMEOVER && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f8fafc]">
          <div className="bg-white border-4 border-black neo-shadow p-12 max-w-2xl w-full flex flex-col items-center relative overflow-hidden">
            {/* Stamp Effect */}
            <div className="absolute top-10 right-10 transform rotate-12 border-4 border-red-500 text-red-500 px-4 py-2 text-4xl font-black uppercase opacity-20 pointer-events-none">
              THẤT BẠI
            </div>

            <h1 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-black">BÁO CÁO NHIỆM VỤ</h1>
            <p className="font-mono text-gray-500 mb-8 uppercase tracking-widest">--- Chiến dịch kết thúc ---</p>
            
            <div className="grid grid-cols-2 gap-6 w-full mb-8">
              <div className="bg-gray-50 border-2 border-black p-4 text-center">
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Kẻ Địch Đã Diệt</div>
                <div className="text-6xl font-black text-[oklch(0.6489_0.2370_26.9728)]">{stats.kills}</div>
              </div>
              <div className="bg-gray-50 border-2 border-black p-4 text-center">
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Cấp Độ Đạt Được</div>
                <div className="text-6xl font-black text-black">{stats.level}</div>
              </div>
            </div>

            <div className="flex gap-4 w-full">
               <button onClick={backToMenu} className="flex-1 py-4 bg-white text-black border-4 border-black neo-shadow font-black text-lg uppercase hover:translate-y-1 hover:translate-x-1 transition-transform">
                 Về Menu Chính
               </button>
               <button onClick={startGame} className="flex-1 py-4 bg-black text-white border-4 border-black neo-shadow font-black text-lg uppercase hover:-translate-y-1 hover:-translate-x-1 transition-transform">
                 Thử Lại Ngay
               </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HISTORY */}
      {showHistory && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-[#f0f0f0] border-4 border-black neo-shadow w-[800px] h-[70vh] flex flex-col">
              {/* Window Header */}
              <div className="bg-black text-white px-4 py-2 flex justify-between items-center border-b-4 border-black">
                <span className="font-mono font-bold uppercase tracking-widest">SYSTEM.HISTORY_LOG</span>
                <button onClick={() => setShowHistory(false)} className="hover:bg-red-500 px-2 font-black transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto flex-1">
                <h2 className="text-4xl font-black italic uppercase mb-6 border-b-4 border-black inline-block">Lịch Sử Chiến Đấu</h2>
                <table className="w-full text-left font-mono border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-3 border-2 border-black">NGÀY</th>
                      <th className="p-3 border-2 border-black">THỜI GIAN</th>
                      <th className="p-3 border-2 border-black">CẤP ĐỘ</th>
                      <th className="p-3 border-2 border-black text-right">DIỆT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={h.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-yellow-100`}>
                        <td className="p-3 border-2 border-black font-bold">{h.date}</td>
                        <td className="p-3 border-2 border-black">{h.timeSurvived}</td>
                        <td className="p-3 border-2 border-black text-[oklch(0.6489_0.2370_26.9728)] font-black">{h.level}</td>
                        <td className="p-3 border-2 border-black text-right font-black">{h.kills}</td>
                      </tr>
                    ))}
                    {history.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500 italic border-2 border-black">Chưa có dữ liệu chiến đấu.</td></tr>}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: TUTORIAL */}
      {showTutorial && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white border-4 border-black neo-shadow w-[900px] h-[80vh] flex flex-col">
              <div className="bg-[oklch(0.9680_0.2110_109.7692)] text-black px-4 py-2 flex justify-between items-center border-b-4 border-black">
                <span className="font-mono font-bold uppercase tracking-widest">MANUAL.PDF</span>
                <button onClick={() => setShowTutorial(false)} className="hover:bg-red-500 hover:text-white px-2 font-black border-2 border-black bg-white flex items-center gap-2 transition-colors">
                  <X className="w-4 h-4" /> ĐÓNG
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                 <div className="grid grid-cols-2 gap-12">
                   <div>
                      <h3 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
                        <Gamepad2 className="w-8 h-8" strokeWidth={2.5} /> Điều Khiển
                      </h3>
                      <div className="flex gap-4 mb-6">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-12 h-12 border-4 border-black flex items-center justify-center font-black bg-gray-100">W</div>
                           <div className="flex gap-2">
                             <div className="w-12 h-12 border-4 border-black flex items-center justify-center font-black bg-gray-100">A</div>
                             <div className="w-12 h-12 border-4 border-black flex items-center justify-center font-black bg-gray-100">S</div>
                             <div className="w-12 h-12 border-4 border-black flex items-center justify-center font-black bg-gray-100">D</div>
                           </div>
                        </div>
                        <div className="flex items-center text-lg font-bold ml-4">
                          Di chuyển nhân vật
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8" strokeWidth={2.5} /> Lưu Ý
                      </h3>
                      <ul className="space-y-4 font-bold border-l-4 border-black pl-4">
                         <li className="text-red-600">THU HẸP VÒNG BO: <span className="text-black font-medium">Mỗi 10 cấp độ, vòng bo sẽ xuất hiện. Ở lại bên trong hoặc chết.</span></li>
                         <li className="text-blue-600">GIÁP NĂNG LƯỢNG: <span className="text-black font-medium">Giáp phục hồi sau khi lên cấp. Nó chịu sát thương thay cho Máu.</span></li>
                      </ul>
                   </div>
                   
                   <div>
                      <h3 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
                        <Swords className="w-8 h-8" strokeWidth={2.5} /> Kho Vũ Khí
                      </h3>
                      <div className="space-y-4">
                         <div className="border-4 border-black p-4 bg-yellow-50 neo-shadow-sm">
                           <div className="flex justify-between mb-2">
                             <strong className="text-orange-600 text-xl font-black">SÚNG LỤC</strong>
                             <span className="text-xs bg-black text-white px-2 py-1 font-mono">TẦM XA</span>
                           </div>
                           <p className="text-sm font-medium">Bắn đạn thẳng về phía kẻ địch gần nhất. Nâng cấp để tăng số lượng đạn và khả năng xuyên thấu.</p>
                         </div>
                         <div className="border-4 border-black p-4 bg-purple-50 neo-shadow-sm">
                           <div className="flex justify-between mb-2">
                             <strong className="text-purple-600 text-xl font-black">SÁCH PHÉP</strong>
                             <span className="text-xs bg-black text-white px-2 py-1 font-mono">CẬN CHIẾN</span>
                           </div>
                           <p className="text-sm font-medium">Xoay quanh người chơi bảo vệ khỏi kẻ địch lao vào. Tăng kích thước và tốc độ quay khi nâng cấp.</p>
                         </div>
                      </div>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: POLICY */}
      {showPolicy && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white border-4 border-black neo-shadow w-[600px] flex flex-col">
              <div className="bg-gray-200 text-black px-4 py-2 flex justify-between items-center border-b-4 border-black">
                <span className="font-mono font-bold uppercase tracking-widest">SECURITY_POLICY.TXT</span>
                <button onClick={() => setShowPolicy(false)} className="hover:bg-black hover:text-white px-2 font-black border-2 border-black transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-black italic uppercase mb-6">Cam Kết AI & Bảo Mật</h2>
                <div className="prose font-medium text-justify mb-8">
                  <p className="mb-4">
                    Trò chơi này được phát triển với sự hỗ trợ của công nghệ Trí tuệ Nhân tạo (AI) tiên tiến để tạo ra trải nghiệm chơi game năng động.
                  </p>
                  <p>
                    Chúng tôi cam kết không thu thập dữ liệu cá nhân của người chơi. Mọi dữ liệu lịch sử đấu chỉ được lưu trữ cục bộ trên thiết bị (Local Storage) của bạn.
                  </p>
                </div>
                <button onClick={() => setShowPolicy(false)} className="w-full bg-black text-white px-4 py-4 font-black hover:bg-gray-800 uppercase border-4 border-transparent hover:border-gray-500">
                  Tôi Đã Hiểu
                </button>
              </div>
           </div>
        </div>
      )}

      {gameState === GameState.LEVEL_UP && <LevelUpModal options={levelUpOptions} onSelect={handleBuffSelect} />}
      {gameState === GameState.QUIZ && currentQuestion && selectedBuff && <QuizModal question={currentQuestion} selectedBuff={selectedBuff} onAnswer={handleQuizResult} />}
      
      {(gameState === GameState.PLAYING || gameState === GameState.LEVEL_UP || gameState === GameState.QUIZ) && <HUD stats={stats} timer={timer} activeBoss={activeBoss} />}

      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full h-full object-contain cursor-crosshair" />
    </div>
  );
};

export default App;

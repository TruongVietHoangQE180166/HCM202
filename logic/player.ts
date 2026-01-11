
import { PlayerStats, FloatingText, Enemy } from '../types';
import { getDistance } from '../utils';

interface PlayerRef {
  x: number;
  y: number;
  size: number;
}

export interface ZoneState {
  active: boolean;
  radius: number;
  center: { x: number; y: number };
  lastBossId: string | null;
}

export const updatePlayerMovement = (
  player: PlayerRef,
  keys: { [key: string]: boolean },
  stats: PlayerStats,
  zone: ZoneState,
  dt: number,
  activeBoss: Enemy | null
) => {
  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup']) dy -= 1;
  if (keys['s'] || keys['arrowdown']) dy += 1;
  if (keys['a'] || keys['arrowleft']) dx -= 1;
  if (keys['d'] || keys['arrowright']) dx += 1;

  let nextX = player.x;
  let nextY = player.y;

  // Normal Movement
  if (dx !== 0 || dy !== 0) {
    const length = Math.sqrt(dx * dx + dy * dy);
    nextX += (dx / length) * stats.moveSpeed * dt;
    nextY += (dy / length) * stats.moveSpeed * dt;
  }

  // Boss 2: Black Hole Pull
  if (activeBoss && activeBoss.type === 'BOSS_2' && activeBoss.attackPattern === 'BLACK_HOLE' && activeBoss.attackState === 'PULLING') {
      const dist = getDistance(player.x, player.y, activeBoss.x, activeBoss.y);
      if (dist < 800) {
          const pullStrength = 300 * (1 - dist / 800) + 50;
          const angle = Math.atan2(activeBoss.y - player.y, activeBoss.x - player.x);
          nextX += Math.cos(angle) * pullStrength * dt;
          nextY += Math.sin(angle) * pullStrength * dt;
      }
  }

  // Zone Constraint
  if (zone.active) {
    const distToCenter = getDistance(nextX, nextY, zone.center.x, zone.center.y);
    if (distToCenter > zone.radius) {
      const angle = Math.atan2(nextY - zone.center.y, nextX - zone.center.x);
      nextX = zone.center.x + Math.cos(angle) * zone.radius;
      nextY = zone.center.y + Math.sin(angle) * zone.radius;
    }
  }
  
  player.x = nextX;
  player.y = nextY;
};

export const updateZoneLogic = (
  zone: ZoneState,
  player: PlayerRef,
  floatingTexts: FloatingText[],
  dt: number,
  activeBoss: Enemy | null
) => {
  // Trigger Zone if there is an active boss AND we haven't triggered for this boss ID yet
  if (activeBoss && zone.lastBossId !== activeBoss.id && !zone.active) {
    zone.active = true;
    zone.lastBossId = activeBoss.id;
    zone.radius = 1200;
    zone.center = { x: player.x, y: player.y };
    floatingTexts.push({
      id: 'zone_warning', x: player.x, y: player.y - 150,
      text: '⚠️ VÒNG BO ĐANG THU HẸP! ⚠️', color: '#ef4444', life: 4, vx: 0, vy: -0.5
    });
  }

  if (zone.active) {
    // Shrink speed
    zone.radius -= 35 * dt; 
    
    // Deactivate when too small
    if (zone.radius < 300) {
        zone.active = false;
        floatingTexts.push({
            id: 'zone_safe', x: player.x, y: player.y - 100,
            text: 'VÒNG BO ĐÃ TAN BIẾN', color: '#22c55e', life: 2, vx: 0, vy: -1
        });
    }
  }
};

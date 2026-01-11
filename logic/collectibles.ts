
import React from 'react';
import { ExpGem, HealthDrop, ArmorDrop, PlayerStats, FloatingText } from '../types';
import { getDistance } from '../utils';

export const updateCollectibles = (
  dt: number,
  gems: ExpGem[],
  healthDrops: HealthDrop[],
  armorDrops: ArmorDrop[],
  player: { x: number, y: number },
  stats: PlayerStats,
  setStats: React.Dispatch<React.SetStateAction<PlayerStats>>,
  handleLevelUp: () => void,
  floatingTexts: FloatingText[]
) => {
    let accumulatedExp = 0;
    let accumulatedHeal = 0;
    let accumulatedArmor = 0;

    // 1. Process Gems (Accumulate EXP)
    gems.forEach(g => {
      const dist = getDistance(player.x, player.y, g.x, g.y);
      if (dist < stats.magnetRange) {
        const angle = Math.atan2(player.y - g.y, player.x - g.x);
        g.x += Math.cos(angle) * 800 * dt;
        g.y += Math.sin(angle) * 800 * dt;
      }
      if (dist < 30) {
        accumulatedExp += g.amount;
        g.amount = 0; // Mark for removal
      }
    });

    // 2. Process Health Drops
    healthDrops.forEach(h => {
        h.life -= dt;
        const dist = getDistance(player.x, player.y, h.x, h.y);
        if (dist < 35) {
             accumulatedHeal += h.healAmount;
             floatingTexts.push({
                id: Math.random().toString(), x: player.x, y: player.y - 40,
                text: `+${Math.round(h.healAmount)} HP`, color: '#22c55e', life: 1.0, vx: 0, vy: -3
             });
             h.life = 0;
        }
    });

    // 3. Process Armor Drops
    armorDrops.forEach(a => {
        a.life -= dt;
        const dist = getDistance(player.x, player.y, a.x, a.y);
        if (dist < 35) {
            accumulatedArmor += a.restoreAmount;
            floatingTexts.push({
                id: Math.random().toString(), x: player.x, y: player.y - 40,
                text: `+${Math.round(a.restoreAmount)} GIÁP`, color: '#3b82f6', life: 1.0, vx: 0, vy: -3
            });
            a.life = 0;
        }
    });

    // 4. Update Stats & Check Level Up
    // Check if we have gathered anything OR if we already have enough EXP to level up (residual from previous frame)
    if (accumulatedExp > 0 || accumulatedHeal > 0 || accumulatedArmor > 0 || stats.exp >= stats.expToNext) {
        setStats(prev => {
            const next = { ...prev };

            // Apply Pickups
            if (accumulatedHeal > 0) next.hp = Math.min(next.maxHP, next.hp + accumulatedHeal);
            if (accumulatedArmor > 0) next.currentArmor = Math.min(next.maxArmor, next.currentArmor + accumulatedArmor);
            
            // Apply EXP
            next.exp += accumulatedExp;

            // Check Level Up Logic
            if (next.exp >= next.expToNext) {
                // Trigger Modal
                handleLevelUp();
                
                // Level Up Stat Boosts
                const extraMaxHP = 100;
                const extraMaxArmor = 50;
                
                next.exp -= next.expToNext; // Carry over excess EXP
                next.expToNext = Math.floor(next.expToNext * 1.3);
                next.level += 1;
                
                next.maxHP += extraMaxHP;
                next.maxArmor += extraMaxArmor;
                
                // PARTIAL RESTORE: Only restore 25% of Max stats instead of Full Restore
                const healAmt = Math.floor(next.maxHP * 0.25);
                const armorAmt = Math.floor(next.maxArmor * 0.25);

                next.hp = Math.min(next.maxHP, next.hp + healAmt); 
                next.currentArmor = Math.min(next.maxArmor, next.currentArmor + armorAmt);

                // Visual Text
                floatingTexts.push({
                    id: Math.random().toString(), x: player.x, y: player.y - 60,
                    text: `LÊN CẤP! +${healAmt} HP`, color: '#fbbf24', life: 2.0, vx: 0, vy: -2
                });
            }
            
            return next;
        });
    }

    const nextGems = gems.filter(g => g.amount > 0);
    const nextHealth = healthDrops.filter(h => h.life > 0);
    const nextArmor = armorDrops.filter(a => a.life > 0);

    return { nextGems, nextHealth, nextArmor };
};

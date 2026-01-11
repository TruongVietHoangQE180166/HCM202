
import { GameHistory, PlayerStats } from '../types';

export const loadGameHistory = (): GameHistory[] => {
  const saved = localStorage.getItem('gameHistory');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load history:", e);
    }
  }
  return [];
};

export const saveGameHistory = (currentHistory: GameHistory[], stats: PlayerStats, time: number): GameHistory[] => {
  const newEntry: GameHistory = {
    id: Math.random().toString(),
    date: new Date().toLocaleDateString('vi-VN'),
    kills: stats.kills,
    level: stats.level,
    timeSurvived: `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`
  };
  
  const updatedHistory = [newEntry, ...currentHistory].slice(0, 10);
  localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
  return updatedHistory;
};

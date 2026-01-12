
import { createClient } from '@supabase/supabase-js';
import { LeaderboardEntry } from '../types';

// NOTE: You must set these in your environment variables or replace them with your actual keys
// If not found, it will gracefully fail (for demo purposes)

// Safely access environment variables to prevent crashes
const getEnvVar = (key: string) => {
    try {
        // @ts-ignore
        if (typeof import.meta !== 'undefined' && import.meta.env) {
            // @ts-ignore
            return import.meta.env[key];
        }
    } catch(e) {}
    return '';
}

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL');
const SUPABASE_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY');

let supabase: any = null;

if (SUPABASE_URL && SUPABASE_KEY) {
    try {
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (e) {
        console.warn('Failed to initialize Supabase client:', e);
    }
}

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    if (!supabase) return [];
    
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('*')
            .order('time_survived', { ascending: false }) // Sort by longest survival
            .limit(20);

        if (error) {
            console.error('Supabase error:', error);
            return [];
        }
        return data as LeaderboardEntry[];
    } catch (e) {
        console.error('Fetch error:', e);
        return [];
    }
};

export const submitScoreToSupabase = async (entry: Omit<LeaderboardEntry, 'id' | 'created_at'>) => {
    if (!supabase) return;

    try {
        const { error } = await supabase
            .from('leaderboard')
            .insert([entry]);
            
        if (error) {
            console.error('Supabase insert error:', error);
        }
    } catch (e) {
        console.error('Submit error:', e);
    }
};

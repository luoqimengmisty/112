export interface Song {
  id: string;
  title: string;
  composer: string;
  weight: number; // 1.0 is standard, higher is bonus
  sheetMusicData?: string; // Base64 string of the image
}

export interface Sticker {
  id: string;
  name: string;
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  collection: 'Elsa' | 'Sanrio';
}

export interface PracticeSession {
  id: string;
  date: string;
  durationSeconds: number;
  effectiveSeconds: number;
  songId?: string; // If null, it's free play
  starsEarned: number;
  verified: boolean;
}

export enum AppView {
  PRACTICE = 'PRACTICE',
  REPERTOIRE = 'REPERTOIRE',
  REWARDS = 'REWARDS',
  SETTINGS = 'SETTINGS'
}

export const INITIAL_SONGS: Song[] = [
  { id: '1', title: '小星星 (Twinkle Twinkle)', composer: 'Suzuki', weight: 1.0 },
  { id: '2', title: '小步舞曲 1 (Minuet 1)', composer: 'J.S. Bach', weight: 1.5 },
  { id: '3', title: '幽默曲 (Humoresque)', composer: 'Dvorak', weight: 2.0 },
];

export const MOCK_STICKERS: Sticker[] = [
  { id: 'e1', name: '冰雪女王', imageUrl: 'https://picsum.photos/seed/elsa1/200/200', rarity: 'Legendary', collection: 'Elsa' },
  { id: 'e2', name: '雪宝', imageUrl: 'https://picsum.photos/seed/olaf/200/200', rarity: 'Common', collection: 'Elsa' },
  { id: 's1', name: '凯蒂公主', imageUrl: 'https://picsum.photos/seed/kitty/200/200', rarity: 'Rare', collection: 'Sanrio' },
  { id: 's2', name: '美乐蒂', imageUrl: 'https://picsum.photos/seed/melody/200/200', rarity: 'Epic', collection: 'Sanrio' },
  { id: 's3', name: '蛋黄哥', imageUrl: 'https://picsum.photos/seed/gudetama/200/200', rarity: 'Common', collection: 'Sanrio' },
];
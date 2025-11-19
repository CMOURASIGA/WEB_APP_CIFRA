export interface Song {
  id: string;
  title: string;
  artist: string;
  originalKey: string;
  content: string; // Lyrics + Chords text
  category: string;
}

export interface Setlist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  createdAt: number;
}

export interface AppSettings {
  driveFolder: string;
  categories: string[];
}

export type TransposeDirection = 'up' | 'down';
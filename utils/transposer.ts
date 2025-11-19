// Chromatic scale in sharps
const SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Mapping flats to sharps for simplification
const FLATS: { [key: string]: string } = {
  'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B', 'Fb': 'E'
};

/**
 * Normalizes a root note to its sharp equivalent if it exists.
 */
const normalizeNote = (note: string): string => {
  return FLATS[note] || note;
};

/**
 * Transposes a single chord root.
 */
const transposeRoot = (root: string, semitones: number): string => {
  const normalized = normalizeNote(root);
  const index = SCALE.indexOf(normalized);
  if (index === -1) return root; // Return original if not found

  // Calculate new index with wrap-around
  let newIndex = (index + semitones) % 12;
  if (newIndex < 0) newIndex += 12;

  return SCALE[newIndex];
};

/**
 * Regex to identify chords.
 * Looks for A-G, optional #/b, followed by typical suffixes like m, 7, maj, dim, etc.
 * It ensures it doesn't match inside words by checking word boundaries.
 */
const CHORD_REGEX = /\b([A-G][#b]?)(m|maj|dim|aug|sus|add|7|9|11|13|[0-9]|\/)*\b/g;

/**
 * Parses text and applies transposition HTML wrapping.
 * Logic: If a line has a high density of "chord-like" words, treat it as a chord line.
 */
export const processSongContent = (content: string, semitones: number): string => {
  const lines = content.split('\n');

  return lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '<br/>';

    // Heuristic: If line is short or contained in brackets [], or matches typical chord structures
    // We'll try to replace chords.
    
    // Replace chords in the line with transposed versions wrapped in spans
    const processedLine = line.replace(CHORD_REGEX, (match, root, suffix) => {
      const transposedRoot = transposeRoot(root, semitones);
      // We wrap the whole chord, but technically we only transposed the root.
      // The suffix (e.g. "m7") stays the same.
      // Handling slash chords (e.g., C/G)
      if (match.includes('/')) {
          const parts = match.split('/');
          const bassRoot = parts[1];
          // Find the root note in the bass part
          const bassMatch = bassRoot.match(/^([A-G][#b]?)/);
          if (bassMatch) {
             const transposedBass = transposeRoot(bassMatch[1], semitones);
             const restOfBass = bassRoot.substring(bassMatch[1].length);
             return `<span class="font-bold text-brand-accent">${transposedRoot}${suffix || ''}/${transposedBass}${restOfBass}</span>`;
          }
      }

      return `<span class="font-bold text-brand-accent">${transposedRoot}${suffix || ''}</span>`;
    });

    return `<div class="leading-relaxed whitespace-pre-wrap font-mono text-lg md:text-xl">${processedLine}</div>`;
  }).join('');
};

/**
 * Calculates the new Key label
 */
export const transposeKey = (originalKey: string, semitones: number): string => {
    const match = originalKey.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return originalKey;
    const root = match[1];
    const suffix = match[2];
    return transposeRoot(root, semitones) + suffix;
};
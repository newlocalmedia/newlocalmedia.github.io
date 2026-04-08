// Site colour palettes.
// To switch palettes, change ACTIVE_PALETTE and run:
//   node scripts/apply-palette.mjs
//
// Each palette defines every value that differs between themes so
// apply-palette.mjs can do a clean swap without chaining transforms.
//
// NOTE: The 'original' palette predates the --accent variable. Its primary
// and accent are the same colour (purple), so all accent-coloured rgba values
// (alt button borders etc.) will map to primary-rgb when switching away from
// it. A manual touch-up of those rules may be needed if switching original → A/B/C.

export const ACTIVE_PALETTE = 'a';

export const PALETTES = {

  // ── Original — Classic Purple ────────────────────────────────────────────
  // The palette the site launched with. Single-hue purple, no separate accent.
  original: {
    name: 'Classic Purple',
    vars: {
      '--primary':    '#8182ff',
      '--foreground': '#c8d2d4',
      '--background': '#272938',
      '--tertiary':   '#0b121e',
      '--accent':     '#8182ff',  // no separate accent in original — same as primary
      '--star':       '#f2c46d',
      '--repo-icon':  '#7fb1ff',
      '--surface':    'rgba(39, 41, 56, 0.88)',
      '--surface-2':  'rgba(11, 18, 30, 0.88)',
    },
    gradientTop:  '#303348',
    themeColor:   '#272938',
    primaryRgb:   '129, 130, 255',
    tertiaryRgb:  '11, 18, 30',
    surfaceRgb:   '39, 41, 56',
    modalRgb:     '6, 10, 18',
    accentRgb:    '129, 130, 255',  // same as primaryRgb — see note above
  },

  // ── Option A — Deep Current ──────────────────────────────────────────────
  // Saturated sky blue + amber complement. Professional, confident.
  a: {
    name: 'Deep Current',
    vars: {
      '--primary':    '#29ABE0',
      '--foreground': '#DCF0F9',
      '--background': '#0D1B2A',
      '--tertiary':   '#071018',
      '--accent':     '#F5A623',
      '--star':       '#F5A623',
      '--repo-icon':  '#5BC4E8',
      '--surface':    'rgba(20, 45, 70, 0.88)',
      '--surface-2':  'rgba(13, 27, 42, 0.88)',
    },
    gradientTop:  '#0F2035',
    themeColor:   '#0D1B2A',
    primaryRgb:   '41, 171, 224',
    tertiaryRgb:  '13, 27, 42',
    surfaceRgb:   '20, 45, 70',
    modalRgb:     '7, 10, 18',
    accentRgb:    '245, 166, 35',
  },

  // ── Option B — Charged ───────────────────────────────────────────────────
  // Electric cyan + mint green. High contrast, kinetic. Developer energy.
  b: {
    name: 'Charged',
    vars: {
      '--primary':    '#00CFFF',
      '--foreground': '#E8F4F8',
      '--background': '#101820',
      '--tertiary':   '#080E16',
      '--accent':     '#7EE8A2',
      '--star':       '#F5A623',
      '--repo-icon':  '#66E8FF',
      '--surface':    'rgba(16, 30, 44, 0.88)',
      '--surface-2':  'rgba(16, 24, 32, 0.88)',
    },
    gradientTop:  '#182030',
    themeColor:   '#101820',
    primaryRgb:   '0, 207, 255',
    tertiaryRgb:  '16, 24, 32',
    surfaceRgb:   '16, 30, 44',
    modalRgb:     '6, 10, 16',
    accentRgb:    '126, 232, 162',
  },

  // ── Option C — Storm Front ───────────────────────────────────────────────
  // Warm-dark base (matches logo bg) + vivid teal + coral pop.
  c: {
    name: 'Storm Front',
    vars: {
      '--primary':    '#2BBFCC',
      '--foreground': '#F0F7F9',
      '--background': '#1A1618',
      '--tertiary':   '#0F0C0D',
      '--accent':     '#FF7E67',
      '--star':       '#F5A623',
      '--repo-icon':  '#4DD6E0',
      '--surface':    'rgba(37, 31, 34, 0.88)',
      '--surface-2':  'rgba(26, 22, 24, 0.88)',
    },
    gradientTop:  '#231D20',
    themeColor:   '#1A1618',
    primaryRgb:   '43, 191, 204',
    tertiaryRgb:  '26, 22, 24',
    surfaceRgb:   '37, 31, 34',
    modalRgb:     '10, 8, 9',
    accentRgb:    '255, 126, 103',
  },
};

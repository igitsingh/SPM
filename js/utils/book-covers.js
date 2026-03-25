/**
 * SPM Book Cover Image Resolver
 * Maps each (unit, subject) combination to a generated HD cover image.
 * Falls back gracefully with per-unit placeholder gradients.
 */

const BASE = '/public/images/books/';

// ── Per-unit, per-subject cover map ────────────────────────────────────────
const COVER_MAP = {

    'Aroma': {
        'Hindi': 'aroma_hindi.png',
        'English': 'aroma_english.png',
        'Mathematics': 'aroma_maths.png',
        'Drawing': 'aroma_drawing.png',
        'Art': 'aroma_drawing.png',
        'Art & Craft': 'aroma_drawing.png',
        'General Knowledge': 'aroma_gk.png',
        'GK': 'aroma_gk.png',
        'Computer': 'aroma_english.png',   // pending — uses English as placeholder
        'Science': 'aroma_hindi.png',     // pending
        'Social Studies': 'aroma_gk.png',        // closest thematic match
    },

    'Bluemoon Series': {
        'English': 'bluemoon_alphabet.png',
        'Drawing': 'bluemoon_drawing.png',
        'Art': 'bluemoon_drawing.png',
        'Hindi': 'bluemoon_alphabet.png',
        'Hindi Writing': 'bluemoon_alphabet.png',
        'Rhymes': 'bluemoon_alphabet.png',
        'Mathematics': 'bluemoon_alphabet.png',
    },

    'Deepanshu Gold': {
        'Hindi': 'deepanshu_hindi.png',
        'Mathematics': 'deepanshu_maths.png',
        'English': 'deepanshu_hindi.png',
        'Science': 'deepanshu_hindi.png',
        'EVS': 'deepanshu_hindi.png',
        'Sanskrit': 'deepanshu_hindi.png',
        'Social Studies': 'deepanshu_maths.png',
    },

    'Disney Publication': {
        'Hindi': 'disney_hindi.png',
        'Mathematics': 'disney_maths.png',
        'English': 'aroma_english.png', // Temporary fallback to Aroma English until Disney English is available
        'Social Studies': 'disney_social.png',
        'Science': 'disney_maths.png',
        'GK': 'disney_social.png',
        'Computer': 'disney_maths.png',
    },

    'Harmony Publications': {
        'Science': 'harmony_science.png',
        'Mathematics': 'harmony_maths.png',
        'English': 'harmony_english.png',
        'Hindi': 'harmony_hindi.png',
        'Social Studies': 'harmony_social.png',
        'Social Science': 'harmony_social.png',
        'Computer': 'harmony_maths.png',
        'Sanskrit': 'harmony_hindi.png',
        'GK': 'harmony_social.png',
    },
};

// ── Per-unit gradient fallbacks (CSS gradient strings) ──────────────────────
export const UNIT_GRADIENTS = {
    'Aroma': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    'Bluemoon Series': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    'Deepanshu Gold': 'linear-gradient(135deg, #7f1d1d 0%, #b45309 100%)',
    'Disney Publication': 'linear-gradient(135deg, #0e7490 0%, #7c3aed 100%)',
    'Harmony Publications': 'linear-gradient(135deg, #14532d 0%, #059669 100%)',
    'Pearl': 'linear-gradient(135deg, #374151 0%, #6b7280 100%)',
};

// ── Resolve subject key (handles partial matches) ──────────────────────────
function resolveSubjectKey(subject, unitMap) {
    if (!subject || !unitMap) return null;
    const s = subject.trim();
    // Exact match first
    if (unitMap[s]) return unitMap[s];
    // Partial match
    for (const key of Object.keys(unitMap)) {
        if (s.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(s.toLowerCase())) {
            return unitMap[key];
        }
    }
    return null;
}

/**
 * Get the best cover image URL for a book.
 * Returns an <img src> path if a generated cover exists,
 * otherwise returns null (caller should use gradient fallback).
 */
export function getCoverImage(unit, subject, category) {
    const subjectToCheck = subject || category || '';
    const unitMap = COVER_MAP[unit];
    const file = resolveSubjectKey(subjectToCheck, unitMap);
    if (file) return BASE + file;

    // Try first word of subject (e.g. "Hindi Grammar" → "Hindi")
    const firstWord = subjectToCheck.split(/\s+/)[0];
    const fileAlt = resolveSubjectKey(firstWord, unitMap);
    if (fileAlt) return BASE + fileAlt;

    return null; // trigger gradient fallback
}

/**
 * Get the CSS gradient for a unit (used as card background when no image).
 */
export function getUnitGradient(unit) {
    return UNIT_GRADIENTS[unit] || 'linear-gradient(135deg, #e2e8f0, #94a3b8)';
}

const HANGUL_SECTIONS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'] as const;
export const ALL_SECTIONS = [...HANGUL_SECTIONS, 'A...Z', '#'] as const;

function getHangulInitial(char: string): string | null {
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return null;

  const index = Math.floor((code - 0xac00) / 588);
  const initials = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const simpleMap: Record<string, string> = {
    ㄲ: 'ㄱ',
    ㄸ: 'ㄷ',
    ㅃ: 'ㅂ',
    ㅆ: 'ㅅ',
    ㅉ: 'ㅈ',
  };
  const raw = initials[index];
  return simpleMap[raw] ?? raw;
}

function getSectionName(value: string): string {
  const first = value.trim()[0];
  if (!first) return '#';

  if (/[가-힣]/.test(first)) return getHangulInitial(first) ?? '#';
  if (/[a-zA-Z]/.test(first)) return 'A...Z';
  return '#';
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((acc, key) => {
    return acc && typeof acc === 'object' && key in acc ? (acc as Record<string, unknown>)[key] : undefined;
  }, obj as unknown);
}

export default function sortItemsWithSection<T>(items: T[], keyPath: string): { section: string; items: T[] }[] {
  const sectionMap = new Map<string, T[]>();
  for (const section of ALL_SECTIONS) sectionMap.set(section, []);

  for (const item of items) {
    const raw = String(getNestedValue(item, keyPath) ?? '');
    const section = getSectionName(raw);
    sectionMap.get(section)?.push(item);
  }

  for (const list of sectionMap.values()) {
    list.sort((a, b) => {
      const aVal = String(getNestedValue(a, keyPath));
      const bVal = String(getNestedValue(b, keyPath));
      return aVal.localeCompare(bVal, 'ko');
    });
  }

  return ALL_SECTIONS.map((section) => ({
    section,
    items: sectionMap.get(section)!,
  }));
}

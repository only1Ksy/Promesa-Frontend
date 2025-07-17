function getHangulInitial(char: string): string | null {
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return null;

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
  const index = Math.floor((code - 0xac00) / 588);
  return initials[index];
}

function getGroupType(char: string): number {
  if (/[가-힣]/.test(char)) return 0;
  if (/[a-zA-Z]/.test(char)) return 1;
  return 2;
}

function getSectionName(value: string): string {
  const firstChar = value.trim()[0] ?? '';
  if (/[가-힣]/.test(firstChar)) {
    return getHangulInitial(firstChar) ?? '#';
  } else if (/[a-zA-Z]/.test(firstChar)) {
    return 'A...Z';
  } else {
    return '#';
  }
}

function getNestedValue<T, K extends string>(obj: T, path: K): unknown {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export default function sortItemsWithSection<T>(items: T[], keyPath: string): (T & { section: string })[] {
  return [...items]
    .map((item) => {
      const value = getNestedValue(item, keyPath);
      const section = getSectionName(String(value));
      return { ...item, section };
    })
    .sort((a, b) => {
      const aVal = String(getNestedValue(a, keyPath));
      const bVal = String(getNestedValue(b, keyPath));
      const aGroup = getGroupType(aVal[0]);
      const bGroup = getGroupType(bVal[0]);

      if (aGroup !== bGroup) return aGroup - bGroup;
      return aVal.localeCompare(bVal, 'ko');
    });
}

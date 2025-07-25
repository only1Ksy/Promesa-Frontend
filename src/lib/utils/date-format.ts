interface formatKoreanDateTimeSchema {
  year: number;
  month: number;
  day: number;
  weekday: string;
  ampm: string;
  hour: number;
  paddedMinute: string;
}

export function formatKoreanDateTime(isoString: string): formatKoreanDateTimeSchema {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdayNames[date.getDay()];

  let hour = date.getHours();
  const minute = date.getMinutes();

  const isAM = hour < 12;
  const ampm = isAM ? '오전' : '오후';

  if (hour === 0) hour = 12;
  if (!isAM && hour > 12) hour -= 12;

  const paddedMinute = minute.toString().padStart(2, '0');

  return { year, month, day, weekday, ampm, hour, paddedMinute };
}

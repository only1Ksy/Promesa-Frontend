export interface Review {
  nickname: string;
  rating: number;
  date: string;
  description: string;
  photos: string[];
}

export const REVIEW_LIST: Review[] = [
  {
    nickname: '햇살가득',
    rating: 5,
    date: '2025-05-17',
    description: '배송도 빠르고 제품도 튼튼해요. 선물용으로도 좋을 것 같아요!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=0',
      'https://source.unsplash.com/random/200x200?sig=1',
      'https://source.unsplash.com/random/200x200?sig=2',
    ],
  },
  {
    nickname: '블루밍데이',
    rating: 5,
    date: '2025-06-08',
    description: '너무 귀엽고 예뻐요! 인테리어 소품으로 딱이에요.',
    photos: ['https://source.unsplash.com/random/200x200?sig=10', 'https://source.unsplash.com/random/200x200?sig=11'],
  },
  {
    nickname: '쿠쿠루삥뽕',
    rating: 3,
    date: '2025-03-02',
    description: '사진보다 실물이 훨씬 고급스럽네요. 만족합니다!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=20',
      'https://source.unsplash.com/random/200x200?sig=21',
      'https://source.unsplash.com/random/200x200?sig=22',
    ],
  },
  {
    nickname: '초코푸딩',
    rating: 1,
    date: '2025-06-06',
    description: '생각보다 더 튼튼해서 놀랐어요!',
    photos: ['https://source.unsplash.com/random/200x200?sig=30', 'https://source.unsplash.com/random/200x200?sig=31'],
  },
  {
    nickname: '민트초코러버',
    rating: 5,
    date: '2025-05-09',
    description: '생각보다 빨리 도착했고 사용법도 쉬워요. 만족!',
    photos: [],
  },
  {
    nickname: '밤하늘별빛',
    rating: 2,
    date: '2025-04-05',
    description: '사진보다 실물이 훨씬 고급스럽네요. 만족합니다!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=50',
      'https://source.unsplash.com/random/200x200?sig=51',
      'https://source.unsplash.com/random/200x200?sig=52',
    ],
  },
  {
    nickname: '냥냥펀치',
    rating: 3,
    date: '2025-04-26',
    description: '생각보다 더 튼튼해서 놀랐어요!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=60',
      'https://source.unsplash.com/random/200x200?sig=61',
      'https://source.unsplash.com/random/200x200?sig=62',
    ],
  },
  {
    nickname: '로지',
    rating: 5,
    date: '2025-05-05',
    description: '사진보다 실물이 훨씬 고급스럽네요. 만족합니다!',
    photos: ['https://source.unsplash.com/random/200x200?sig=70'],
  },
  {
    nickname: '진진자라',
    rating: 2,
    date: '2025-03-31',
    description: '포장이 좀 허술해서 별점 낮춥니다. 제품은 무난했어요.',
    photos: ['https://source.unsplash.com/random/200x200?sig=80'],
  },
  {
    nickname: '하늘보리',
    rating: 5,
    date: '2025-05-25',
    description: '사진이랑 거의 똑같아요. 맘에 들어요.',
    photos: [],
  },
  {
    nickname: '도란도란',
    rating: 1,
    date: '2025-04-09',
    description: '기대했던 것보단 작지만 디자인이 예뻐서 만족해요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=100',
      'https://source.unsplash.com/random/200x200?sig=101',
      'https://source.unsplash.com/random/200x200?sig=102',
    ],
  },
  {
    nickname: '감자칩러버',
    rating: 3,
    date: '2025-05-26',
    description: '살짝 흠집이 있었지만 교환 없이 사용합니다. 이뻐요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=110',
      'https://source.unsplash.com/random/200x200?sig=111',
    ],
  },
  {
    nickname: '피치베어',
    rating: 3,
    date: '2025-06-23',
    description: '친구 추천으로 샀는데 대만족입니다! 또 사고 싶어요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=120',
      'https://source.unsplash.com/random/200x200?sig=121',
    ],
  },
  {
    nickname: '자몽청',
    rating: 1,
    date: '2025-06-04',
    description: '배송도 빠르고 제품도 튼튼해요. 선물용으로도 좋을 것 같아요!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=130',
      'https://source.unsplash.com/random/200x200?sig=131',
      'https://source.unsplash.com/random/200x200?sig=132',
    ],
  },
  {
    nickname: '마시멜로우',
    rating: 4,
    date: '2025-03-08',
    description: '너무 귀엽고 예뻐요! 인테리어 소품으로 딱이에요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=140',
      'https://source.unsplash.com/random/200x200?sig=141',
    ],
  },
  {
    nickname: '러브송',
    rating: 2,
    date: '2025-03-16',
    description: '깔끔하고 실용적이에요. 재구매 의사 있어요!',
    photos: [],
  },
  {
    nickname: '스노우볼',
    rating: 1,
    date: '2025-06-02',
    description: '기대했던 것보단 작지만 디자인이 예뻐서 만족해요.',
    photos: [],
  },
  {
    nickname: '달콤새콤',
    rating: 2,
    date: '2025-03-20',
    description: '평범한 제품이에요. 특별히 좋거나 나쁘진 않네요.',
    photos: [],
  },
  {
    nickname: '별빛초코',
    rating: 5,
    date: '2025-03-17',
    description: '살짝 흠집이 있었지만 교환 없이 사용합니다. 이뻐요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=180',
      'https://source.unsplash.com/random/200x200?sig=181',
    ],
  },
  {
    nickname: '유자소다',
    rating: 3,
    date: '2025-05-22',
    description: '배송도 빠르고 제품도 튼튼해요. 선물용으로도 좋을 것 같아요!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=190',
      'https://source.unsplash.com/random/200x200?sig=191',
      'https://source.unsplash.com/random/200x200?sig=192',
    ],
  },
  {
    nickname: '해피캣',
    rating: 1,
    date: '2025-06-26',
    description: '사진보다 실물이 훨씬 고급스럽네요. 만족합니다!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=200',
      'https://source.unsplash.com/random/200x200?sig=201',
    ],
  },
  {
    nickname: '푸른숲',
    rating: 5,
    date: '2025-03-09',
    description: '사진보다 실물이 훨씬 고급스럽네요. 만족합니다!',
    photos: [],
  },
  {
    nickname: '멜로우타임',
    rating: 4,
    date: '2025-03-17',
    description: '너무 귀엽고 예뻐요! 인테리어 소품으로 딱이에요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=220',
      'https://source.unsplash.com/random/200x200?sig=221',
    ],
  },
  {
    nickname: '꿀벌이',
    rating: 3,
    date: '2025-03-13',
    description: '사진보다 실물이 훨씬 고급스럽네요. 만족합니다!',
    photos: [],
  },
  {
    nickname: '작은별',
    rating: 1,
    date: '2025-05-11',
    description: '생각보다 더 튼튼해서 놀랐어요!',
    photos: ['https://source.unsplash.com/random/200x200?sig=240'],
  },
  {
    nickname: '보름달밤',
    rating: 4,
    date: '2025-06-14',
    description: '생각보다 빨리 도착했고 사용법도 쉬워요. 만족!',
    photos: ['https://source.unsplash.com/random/200x200?sig=250'],
  },
  {
    nickname: '솜사탕빛',
    rating: 1,
    date: '2025-03-17',
    description: '소재가 부드럽고 마감도 잘 되어있어요.',
    photos: ['https://source.unsplash.com/random/200x200?sig=260'],
  },
  {
    nickname: '베리굿',
    rating: 5,
    date: '2025-05-16',
    description: '기대했던 것보단 작지만 디자인이 예뻐서 만족해요.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=270',
      'https://source.unsplash.com/random/200x200?sig=271',
    ],
  },
  {
    nickname: '새벽달',
    rating: 3,
    date: '2025-04-11',
    description: '중간 정도의 퀄리티에요. 가격 생각하면 괜찮은 듯.',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=280',
      'https://source.unsplash.com/random/200x200?sig=281',
    ],
  },
  {
    nickname: '몽글몽글',
    rating: 3,
    date: '2025-02-26',
    description: '깔끔하고 실용적이에요. 재구매 의사 있어요!',
    photos: [
      'https://source.unsplash.com/random/200x200?sig=290',
      'https://source.unsplash.com/random/200x200?sig=291',
      'https://source.unsplash.com/random/200x200?sig=292',
    ],
  },
];

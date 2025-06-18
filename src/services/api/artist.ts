// mock API code

export interface Artist {
  artistId: number;
  artistName: string;
  artistDescription: string;
}

const ARTIST_LIST = [
  {
    artistId: 1,
    artistName: '아티스트',
    artistDescription:
      'TEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMP',
  },
  {
    artistId: 2,
    artistName: '아티스트',
    artistDescription:
      'TEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMPTEMP',
  },
  {
    artistId: 3,
    artistName: '박아름',
    artistDescription:
      '박아름 작가는 오랜 시간 부서져 작은 알갱이가 된 돌의 조각들을 다시 하나의 덩어리로 만들고 고온의 불에 소성하여 원래의 성질로 환원시킵니다.\n이 작은 입자들이 모여 이루는 형태를 통해, 자연과 일상 속에 깃든 시간의 흐름을 표현하고자 합니다. 작가의 작업은 일상 속에서 새로운 역할을 가지며 우리 삶의 한 부분이 됩니다.\n\n박아름 작가는 1992년 경상북도 안동에서 태어났습니다. 어릴적부터 흙을 만지는 일에 깊은 흥미를 느끼며 자연 속에서 감각을 키워왔습니다. 서울과학예술대학교 도예과를 졸업한 뒤, 같은 학교 대학원에서 현대도예를 전공하며 석사 학위를 취득하였습니다. 유학 기간 동안 일본 가나자와 미술공예대학에서 교환 연구를 진행하며 전통과 현대 도자의 경계를 탐색하는 계기를 가졌습니다.\n\n박아름 작가의 작업은 흙의 질감과 시간의 흔적을 주제로 합니다.\n작가는 도자가 단순히 기능을 담는 용기를 넘어서, 감정을 담는 그릇이 될 수 있다고 말합니다. 일상에서 쉽게 지나치는 자연의 미묘한 변화, 마모된 벽면, 바람에 깎인 돌의 형상 등에서 영감을 받습니다. 프로메사에서 박아름 작가의 특별한 도자 제품들을 만나보세요.',
  },
] as Artist[];

export const fetchArtistInformation = async (artistId: number) => {
  const data = ARTIST_LIST.find((item) => item.artistId === artistId);
  return { data };
};

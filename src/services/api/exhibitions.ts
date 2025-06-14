// mock API code

interface Exhibition {
  exhibitionId: number;
  exhibitionTitle: string;
  exhibitionDescription: string;
}

export const fetchExhibitions = async () => {
  const data = [
    {
      exhibitionId: 2001,
      exhibitionTitle: '작가 영은의 작업실에서',
      exhibitionDescription: '핸드메이드 도자기 탐방',
    },
    {
      exhibitionId: 2002,
      exhibitionTitle: '작가 영은의 작업실에서',
      exhibitionDescription: '핸드메이드 도자기 탐방',
    },
    {
      exhibitionId: 2003,
      exhibitionTitle: '작가 영은의 작업실에서',
      exhibitionDescription: '핸드메이드 도자기 탐방',
    },
    {
      exhibitionId: 2004,
      exhibitionTitle: '작가 영은의 작업실에서',
      exhibitionDescription: '핸드메이드 도자기 탐방',
    },
    {
      exhibitionId: 2005,
      exhibitionTitle: '작가 영은의 작업실에서',
      exhibitionDescription: '핸드메이드 도자기 탐방',
    },
  ] as Exhibition[];
  return { data };
};

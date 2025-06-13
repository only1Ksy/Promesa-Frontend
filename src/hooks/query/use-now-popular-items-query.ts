import { useQuery } from '@tanstack/react-query';

import type { Item } from '@/types/item.dto';

const mockFetchNowPopularItems = async (): Promise<Item[]> => {
  return [
    {
      itemId: 1001,
      itemName: '반짝반짝 도자기',
      itemDescription: '',
      price: 28000,
      thumbnailUrl: '',
      artistName: '아티스트',
      isWished: true,
      sale: 30,
    },
    {
      itemId: 1002,
      itemName: '반짝반짝 도자기',
      itemDescription: '',
      price: 28000,
      thumbnailUrl: '',
      artistName: '아티스트',
      isWished: false,
      sale: 30,
    },
    {
      itemId: 1003,
      itemName: '반짝반짝 도자기',
      itemDescription: '',
      price: 28000,
      thumbnailUrl: '',
      artistName: '아티스트',
      isWished: false,
      sale: 30,
    },
    {
      itemId: 1004,
      itemName: '반짝반짝 도자기',
      itemDescription: '',
      price: 28000,
      thumbnailUrl: '',
      artistName: '아티스트',
      isWished: true,
      sale: 30,
    },
    {
      itemId: 1005,
      itemName: '반짝반짝 도자기',
      itemDescription: '',
      price: 28000,
      thumbnailUrl: '',
      artistName: '아티스트',
      isWished: false,
      sale: 30,
    },
  ];
};

export const useNowPopularItemsQuery = () =>
  useQuery({
    queryKey: ['nowPopularItems'],
    queryFn: mockFetchNowPopularItems,
    staleTime: 1000,
  });

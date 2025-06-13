import { useQuery } from '@tanstack/react-query';

import type { Item } from '@/types/item.dto';

type ThumbnailItem = Pick<Item, 'itemId' | 'itemName'>;

const mockFetchThumbnailItems = async (): Promise<ThumbnailItem[]> => {
  return [
    {
      itemId: 1101,
      itemName: '첫 번째',
    },
    {
      itemId: 1102,
      itemName: '두 번째',
    },
    {
      itemId: 1103,
      itemName: '세 번째',
    },
    {
      itemId: 1104,
      itemName: '네 번째',
    },
    {
      itemId: 1105,
      itemName: '다섯 번째',
    },
  ];
};

export const useThumbnailItemsQuery = () =>
  useQuery({
    queryKey: ['thumbnailItems'],
    queryFn: mockFetchThumbnailItems,
    staleTime: 1000,
  });

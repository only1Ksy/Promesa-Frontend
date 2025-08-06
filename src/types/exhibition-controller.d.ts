import { ItemPreviewResponseSchema } from './item-controller';

export interface ExhibitionSummarySchema {
  id: number;
  status: 'ONGOING' | 'UPCOMING' | 'PERMANENT' | 'PAST';
  title: string;
  description: string;
  artistNames: string[];
  startDate: string;
  endDate: string | null;
  thumbnailImageKey: string;
  thumbnailImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExhibitionDetailSchema {
  images: {
    detailedImageUrl: string;
    sortOrder: number;
  }[];
}

export interface ExhibitionSummaryResponseSchema {
  summary: ExhibitionSummarySchema;
  itemPreviews: ItemPreviewResponseSchema[];
}

export interface ExhibitionDetailResponseSchema extends ExhibitionSummaryResponseSchema {
  detail: ExhibitionDetailSchema;
}

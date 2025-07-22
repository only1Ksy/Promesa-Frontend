import { ItemPreviewResponseSchema } from './item-controller';

export interface ExhibitionSummarySchema {
  id: number;
  status: 'ONGOING' | 'UPCOMING' | 'PERMANENT' | 'PAST';
  title: string;
  description: string;
  startDate: string;
  endData: string;
  imageKey: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExhibitionResponseSchema {
  summary: ExhibitionSummarySchema;
  itemPreviews: ItemPreviewResponseSchema[];
}

export interface ExhibitionResponseSchema {
  id: number;
  status: 'ONGOING' | 'ENDED';
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  imageKey: string;
  imageUrl: string;
}

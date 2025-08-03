export interface AdminExhibitionRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnailKey: string;
  detailImageKeys: Array<{
    key: string;
    sortOrder: number;
  }>;
  itemIds: number[];
}

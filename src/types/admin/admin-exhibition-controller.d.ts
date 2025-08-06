export interface AdminRegisterExhibitionRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  thumbnailKey: string;
  imageKeys: {
    key: string;
    sortOrder: number;
  }[];
  itemIds: number[];
}

export interface AdminUpdateExhibitionRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string | null;
  thumbnailKey?: string;
  imageKeys?: {
    key: string;
    sortOrder: number;
  }[];
  itemIds?: number[];
}

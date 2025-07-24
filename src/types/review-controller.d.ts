export interface Review {
  reviewId: number;
  content: string;
  itemId: number;
  reviewerId: number;
  rating: number;
  reviewImages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Review[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 리뷰 이미지 URL
export interface PresignedUrl {
  key: string;
  url: string;
}

export type PresignedUrlResponse = PresignedUrl[];

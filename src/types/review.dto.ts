export interface Review {
  reviewId: number;
  content: string;
  itemId: number;
  reviewerId: number;
  rating: number;
  reviewImages: string[];
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

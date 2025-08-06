export interface Review {
  reviewId: number;
  content: string;
  itemId: number;
  reviewerId: number;
  reviewerName: string;
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

// 작성 가능한 리뷰 아이템
export interface EligibleReviewItem {
  orderId: number;
  orderItemId: number;
  itemId: number;
  itemName: string;
  artistName: string;
  itemThumbnail: string;
  orderDate: string;
  deliveryStatus: 'READY' | 'SHIPPING' | 'DELIVERED' | string;
  quantity: number;
}

// 작성한 리뷰
export interface WrittenReviews {
  orderItemSummary: EligibleReviewItem;
  reviewResponse: {
    reviewId: number;
    content: string;
    itemId: number;
    orderItemId: number;
    reviewerId: number;
    reviewerName: string;
    rating: number;
    reviewImages: PresignedUrlResponse;
    createdAt: string;
    updatedAt: string;
  };
}

export type WrittenReviewsResponse = WrittenReviews[];

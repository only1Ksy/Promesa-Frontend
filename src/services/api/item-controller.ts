import type {
  ItemControllerServerParams,
  ItemPreviewResponseSchema,
  ItemResponseSchema,
  ParsedItemData,
} from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchNowPopularItems = () =>
  withErrorBoundary<[], ItemPreviewResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/categories/0/items?page=0&size=5');
    return res.data.data.content;
  });

export const fetchItem = (itemId: number) =>
  withErrorBoundary<[number], ItemResponseSchema>(async () => {
    const res = await axiosInstance.get(`/items/${itemId}`);
    return res.data.data;
  }, itemId);

export const fetchShopItems = (params: ItemControllerServerParams) =>
  withErrorBoundary<[ItemControllerServerParams], { content: ItemPreviewResponseSchema[]; totalPages: number }>(
    async (params) => {
      const { categoryId, page, sort, size } = params;
      const res = await axiosInstance.get(`/categories/${categoryId}/items?page=${page}&size=${size}&sort=${sort}`);
      return {
        content: res.data.data.content,
        totalPages: res.data.data.totalPages,
      };
    },
    params,
  );

export const parseItemResponse = (data: ItemResponseSchema): ParsedItemData => ({
  itemId: data.itemSummary.itemId,
  title: data.itemSummary.title,
  imageUrls: data.itemSummary.imageUrls,
  category: {
    id: data.itemSummary.categoryId,
    name: data.itemSummary.categoryName,
  },
  averageRating: data.itemSummary.averageRating,
  reviewCount: data.itemSummary.reviewCount,

  productCode: data.itemDetail.productCode,
  type: data.itemDetail.type,
  width: data.itemDetail.width,
  height: data.itemDetail.height,
  depth: data.itemDetail.depth,

  isWishlisted: data.itemWish.isWishlisted,
  wishCount: data.itemWish.wishCount,

  artist: {
    id: data.artistProfile.artistId,
    name: data.artistProfile.name,
    profileImageUrl: data.artistProfile.profileImageUrl,
    bio: data.artistProfile.bio,
    instagramUrl: data.artistProfile.instagramUrl,
    isWishlisted: data.artistWish.isWishlisted,
    wishCount: data.artistWish.wishCount,
  },

  price: data.itemSales.price,
  stock: data.itemSales.stock,
  soldOut: data.itemSales.soldOut,
  freeShipping: data.itemSales.freeShipping,
  shippingPolicy: data.itemSales.shippingPolicy,
});

/** itemId를 넘기면 아이템의 상세 페이지 정보를 불러오는 함수 */
export const fetchItemDetail = (itemId: number) =>
  withErrorBoundary<[number], ParsedItemData>(async () => {
    const res = await axiosInstance.get(`/items/${itemId}`);
    return parseItemResponse(res.data.data);
  }, itemId);

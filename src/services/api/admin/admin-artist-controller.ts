import {
  AdminRegisterArtistRequest,
  AdminUpdateArtistProfileImageRequest,
  AdminUpdateArtistRequest,
} from '@/types/admin/admin-artist-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 작가 등록 API
 * POST /admin/artists
 *
 * @param payload - 등록할 작가 정보 (AdminRegisterArtistRequest)
 * @returns 등록 성공 여부 또는 메시지
 */
export const registerArtist = (payload: AdminRegisterArtistRequest) =>
  withErrorBoundary<[AdminRegisterArtistRequest], boolean>(async (payload) => {
    const res = await axiosInstance.post('/admin/artists', payload);
    return res.data.status;
  }, payload);

/**
 * 작가 정보 수정 API
 * PATCH /admin/artists/{artistId}
 *
 * @param artistId - 수정할 작가 ID (path param)
 * @param payload - 수정할 필드 정보 (AdminUpdateArtistRequest)
 * @returns 수정 성공 여부 또는 메시지
 */
export const updateArtist = (artistId: number, payload: AdminUpdateArtistRequest) =>
  withErrorBoundary<[number, AdminUpdateArtistRequest], boolean>(
    async (artistId, payload) => {
      const res = await axiosInstance.patch(`/admin/artists/${artistId}`, payload);
      return res.data.status;
    },
    artistId,
    payload,
  );

/**
 * 작가 프로필 이미지 변경 API
 * PATCH /admin/artists/{artistId}/profile-image
 *
 * @param artistId - 대상 작가 ID
 * @param payload - 새 프로필 이미지 키
 * @returns 변경 성공 여부 또는 메시지
 */
export const updateArtistProfileImage = (artistId: number, payload: AdminUpdateArtistProfileImageRequest) =>
  withErrorBoundary<[number, AdminUpdateArtistProfileImageRequest], boolean>(
    async (artistId, payload) => {
      const res = await axiosInstance.patch(`/admin/artists/${artistId}/profile-image`, payload);
      return res.data.status;
    },
    artistId,
    payload,
  );

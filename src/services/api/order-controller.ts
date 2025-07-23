import { AddressSchema } from '@/types/address-controller';

import { withErrorBoundary } from './axios/instance';
import { axiosInstance } from './axios/instance';

/** 이름, 우편번호, 메인주소, 서브주소, 핸드폰번호를 전달하면 기본 배송지로 설정하는 함수 */
export const PostDefaultAddress = (
  recipientName: string,
  zipCode: string,
  addressMain: string,
  addressDetails: string,
  recipientPhone: string,
) =>
  withErrorBoundary<[string, string, string, string, string], AddressSchema>(
    async (recipientName, zipCode, addressMain, addressDetails, recipientPhone) => {
      const res = await axiosInstance.post('/orders/address', {
        recipientName,
        zipCode,
        addressMain,
        addressDetails,
        recipientPhone,
      });

      return res.data.data;
    },
    recipientName,
    zipCode,
    addressMain,
    addressDetails,
    recipientPhone,
  );

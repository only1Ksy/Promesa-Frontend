import { z } from 'zod';

// 이름은 영문 또는 한글만 허용
const nameRegex = /^[가-힣a-zA-Z]+$/;

// 배송 정보 스키마
export const deliverySchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름은 한 글자 이상 입력해주세요.' })
    .regex(nameRegex, { message: '이름은 영문 또는 한글로 한 글자 이상 입력해주세요.' }),

  phone1: z.string().regex(/^\d{2,3}$/, {
    message: '전화번호 앞자리는 숫자로 2~3자리를 입력해주세요.',
  }),

  phone2: z.string().regex(/^\d{4}$/, {
    message: '전화번호는 숫자로 각 4자리를 입력해주세요.',
  }),

  phone3: z.string().regex(/^\d{4}$/, {
    message: '전화번호는 숫자로 각 4자리를 입력해주세요.',
  }),

  postcode: z.string().min(1, { message: '우편번호를 입력해주세요.' }),

  address: z.string().min(1, { message: '주소를 입력해주세요.' }),

  addressDetail: z.string().optional(),

  isDefault: z.boolean(),

  deliveryType: z.enum(['recent', 'new'], {
    errorMap: () => ({ message: '배송지 유형이 올바르지 않습니다.' }),
  }),
});

export type DeliveryForm = z.infer<typeof deliverySchema>;

// 결제 정보 스키마
export const paymentSchema = z.object({
  depositor: z
    .string()
    .min(1, { message: '입금자명을 입력해주세요.' })
    .regex(nameRegex, { message: '입금자명은 영문 또는 한글로 한 글자 이상 입력해주세요.' }),

  selectedBank: z.string().min(1, { message: '은행을 선택해주세요.' }),
});

export type PayForm = z.infer<typeof paymentSchema>;

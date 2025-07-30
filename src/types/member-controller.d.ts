export interface MemberAddressSchema {
  recipientName: string;
  zipCode: string;
  addressMain: string;
  addressDetails: string;
  recipientPhone: string;
}

export interface MemberBasicSchema {
  name: string;
  provider: string;
  providerId: string;
  phone: string;
  smsAgree: boolean;
  gender: 'MALE' | 'FEMALE';
}

export interface MemberBirthSchema {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  isSolar: boolean;
}

export interface MemberResponseSchema {
  profile: MemberBasicSchema;
  birth: MemberBirthSchema;
  address: MemberAddressSchema;
}

export interface MemberUpdateRequestSchema {
  phone: MemberBasicSchema['phone'];
  smsAgree: MemberBasicSchema['boolean'];
  gender: MemberBasicSchema['gender'];
  birth: MemberBirthSchema;
  address: MemberAddressSchema;
}

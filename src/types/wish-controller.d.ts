export interface TargetSchema {
  targetType: 'ARTIST' | 'ITEM';
  targetId: number;
  wishCount: number;
}

export interface WishToggleSchema {
  message: string;
  wished: boolean;
  target: TargetSchema;
}

export interface WishResponseSchema {
  targetType: TargetSchema['targetType'];
  targetId: TargetSchema['targetId'];
  title: string;
  thumbnailUrl: string;
  artistName: string;
  price: number;
}

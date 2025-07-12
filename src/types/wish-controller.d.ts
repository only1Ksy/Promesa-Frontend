interface TargetSchema {
  targetType: 'ARTIST' | 'ITEM';
  targetId: number;
  wishCount: number;
}

export interface WishToggleSchema {
  message: string;
  wished: boolean;
  target: TargetSchema;
}

interface TargetSchema {
  targetType: 'ARTIST' | 'iTEM';
  targetId: number;
  wishCount: number;
}

export interface WishToggleSchema {
  message: string;
  wished: boolean;
  target: TargetSchema;
}

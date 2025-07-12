export interface WishToggleSchema {
  message: string;
  wished: boolean;
  target: {
    targetType: 'ARTIST' | 'iTEM';
    targetId: number;
    wishCount: number;
  };
}

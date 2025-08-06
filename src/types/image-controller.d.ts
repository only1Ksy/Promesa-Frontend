export interface ImagePostRequestSchema {
  imageType: 'ITEM' | 'ARTIST' | 'MEMBER' | 'EXHIBITION';
  referenceId: number | null;
  subType: 'MAIN' | 'DETAIL' | 'PROFILE' | 'REVIEW' | 'THUMBNAIL';
  subReferenceId: number | null;
  fileNames: string[];
}

export interface ImagePostResponseSchema {
  key: string;
  url: string;
}

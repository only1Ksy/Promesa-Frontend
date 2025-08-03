export interface AdminArtist {
  artistName: string;
  subName: string;
  profileKey: string;
  insta: string;
  memberId: number;
}

export interface AdminArtistUpdate {
  artistName: {
    present: boolean;
  };
  subName: {
    present: boolean;
  };
  description: {
    present: boolean;
  };
  insta: {
    present: boolean;
  };
}

export interface ArtistProfileImageUpdate {
  profileImageKey: string;
}

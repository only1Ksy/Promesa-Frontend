export interface AdminArtist {
  artistName: string;
  subName: string | null;
  profileKey: string;
  insta: string | null;
  memberId: number;
}

export interface AdminArtistUpdate {
  artistName?: string;
  subName?: string | null;
  description?: string;
  insta?: string | null;
}

export interface ArtistProfileImageUpdate {
  profileImageKey: string;
}

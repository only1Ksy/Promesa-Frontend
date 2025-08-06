export interface AdminRegisterArtistRequest {
  artistName: string;
  subName: string | null;
  profileKey: string;
  insta: string | null;
  memberId: number;
}

export interface AdminUpdateArtistRequest {
  artistName?: string;
  subName?: string | null;
  description?: string;
  insta?: string | null;
}

export interface AdminUpdateArtistProfileImageRequest {
  profileImageKey: string;
}

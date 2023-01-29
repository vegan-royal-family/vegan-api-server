export interface INaverProfileResponse {
  response: INaverProfile;
}

export interface INaverProfile {
  id: string;
  email: string;
  nickname: string;
  gender?: string;
  birthyear?: string;
}

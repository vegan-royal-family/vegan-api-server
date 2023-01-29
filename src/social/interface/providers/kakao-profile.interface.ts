export interface IKakaoProfile {
  id: string;
  kakao_account: IKakaoAccount;
}

interface IKakaoAccount {
  profile: IKakaoUserInfo;
  email?: string;
}

interface IKakaoUserInfo {
  nickname?: string;
  gender?: string;
}

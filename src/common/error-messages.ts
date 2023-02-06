export class ErrorMessages {
  static readonly alreadyExistUserEmail = '이미 회원으로 등록된 이메일입니다.';
  static readonly alreadyRegisteredSocialMessage = '이미 SNS로 가입되어 있습니다.\nSNS 간편 로그인을 시도해주세요.';
  static readonly cantFollowSelfMessage = '자기 자신을 팔로우할 수 없습니다.';
  static readonly cantLikeOwnReview = '자신의 리뷰에는 좋아요를 할 수 없습니다.';
  static readonly default = '예상치 못한 오류가 발생했어요.\n잠시 후 다시 시도해 주세요.';
  static readonly exceedLoginAttemptMessage = (arg: { currentCount: number; delaySecond: number }) => `비밀번호가 ${arg.currentCount}회 잘못 입력되어 개인 정보 보호를 위해 로그인이 제한됩니다.\n${arg.delaySecond}초 후에 다시 시도하거나, 비밀번호 재설정 후 이용해주세요.`;
  static readonly invalidPassword = '영문, 숫자, 특수문자 중 2개 이상 조합해주세요.';
  static readonly invalidPerson = '올바른 인물 정보를 입력해 주세요.';
  static readonly invalidSearchValue = '올바른 커서가 아닙니다.';
  static readonly invalidThemeMessage = '올바른 컬렉션 정보가 입력되지 않았습니다.';
  static readonly loginFailureMessage = (currentCount: number) => `비밀번호가 ${currentCount}회 잘못 입력되었습니다.\n5회 이상 실패 시, 개인 정보 보호를 위해 로그인이 제한될 수 있습니다.\n비밀번호가 생각나지 않으신다면 재설정해주세요!`;
  static readonly maxLimitMessage = (maxLimit: number) => `limit은 ${maxLimit}을 초과할 수 없습니다.`;
  static readonly minLimitMessage = (minLimit: number) => `limit은 ${minLimit}미만일 수 없습니다.`;
  static readonly minOffsetMessage = (minOffset: number) => `offset은 ${minOffset}미만일 수 없습니다.`;
  static readonly notAllowedEmptyCharacter = '공백 문자는 사용할 수 없습니다.';
  static readonly socialErrorMessage = '로그인에 실패했습니다. 다시 시도해주세요.\n오류가 반복되면 고객센터에 문의해주세요.';
  static readonly tooShortPassword = '최소 글자 수를 채워주세요.';
  static readonly userNotFoundMessage = '회원 정보가 존재하지 않습니다.';
  static readonly notFoundLiketarget = '좋아요 대상이 존재하지 않습니다.';
}

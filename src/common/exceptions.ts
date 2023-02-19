import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { ErrorMessages } from './error-messages';

export class Exceptions {
  static readonly alreadyExistUserEmail = new BadRequestException(ErrorMessages.alreadyExistUserEmail);
  static readonly alreadyExistUserProfile = new BadRequestException(ErrorMessages.alreadyExistUserProfile);
  static readonly alreadyRegisteredSocialError = new ForbiddenException(ErrorMessages.alreadyRegisteredSocialMessage);
  static readonly cantFollowSelfError = new BadRequestException(ErrorMessages.cantFollowSelfMessage);
  static readonly cantLikeOwnReviewError = new BadRequestException(ErrorMessages.cantLikeOwnReview);
  static readonly exceedLoginAttemptError = (args: { currentCount: number; delaySecond: number }) => new ForbiddenException(ErrorMessages.exceedLoginAttemptMessage(args));
  static readonly fallback = new InternalServerErrorException(ErrorMessages.default);
  static readonly invalidPassword = new BadRequestException(ErrorMessages.invalidPassword);
  static readonly invalidPerson = new BadRequestException(ErrorMessages.invalidPerson);
  static readonly invalidSearchValue = new BadRequestException(ErrorMessages.invalidSearchValue);
  static readonly invalidThemeError = new BadRequestException(ErrorMessages.invalidThemeMessage);
  static readonly loginFailureError = (currentCount: number) => new ForbiddenException(ErrorMessages.loginFailureMessage(currentCount));
  static readonly socialError = new InternalServerErrorException(ErrorMessages.socialErrorMessage);
  static readonly userNotFoundError = new NotFoundException(ErrorMessages.userNotFoundMessage);
}

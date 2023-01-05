import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ErrorMessages } from './error-messages';

export class Exceptions {
  static readonly alreadyReservedError = new ForbiddenException(
    ErrorMessages.alreadyReservedErrorMessage,
  );

  static readonly emailAlreadyExistsError = new BadRequestException(
    ErrorMessages.emailAlreadyExistsErrorMessage,
  );

  static readonly fallback = new InternalServerErrorException(ErrorMessages.default);
  static readonly userNotFoundError = new NotFoundException(ErrorMessages.userNotFoundMessage);
  static readonly shopNotFoundError = new NotFoundException(ErrorMessages.shopNotFoundMessage);
  static readonly menuNotFoundError = new NotFoundException(ErrorMessages.menuNotFoundMessage);
  static readonly invalidPasswordError = new ForbiddenException(
    ErrorMessages.invalidPasswordErrorMessage,
  );

  static readonly invalidAddSeatError = new BadRequestException(
    ErrorMessages.invalidAddSeatErrorMessage,
  );

  static readonly notPermittedError = new ForbiddenException(
    ErrorMessages.notPermittedErrorMessage,
  );
}

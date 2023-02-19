import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { Gender } from '../../common/enum';
import { VeganLevel } from '../enum';

@ArgsType()
export class AddUserProfileArgs {
  @Min(0)
  @IsInt()
  @Field(() => Int)
  userId: number;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @Field()
  nickname: string;

  @IsEnum(Gender)
  @Field(() => Gender)
  gender: Gender;

  @MaxLength(8)
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  @Field()
  birth: string;

  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  @Field(() => [Int])
  veganFor: number[];

  @Min(0)
  @IsInt()
  @Field(() => Int)
  veganTypeId: number;

  @IsEnum(VeganLevel)
  @Field(() => VeganLevel)
  veganLevel: VeganLevel;

  @IsOptional()
  @Min(0)
  @IsInt()
  @Field(() => Int, { nullable: true })
  profileFileId?: number;
}

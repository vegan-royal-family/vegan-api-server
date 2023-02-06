import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutPut } from '../../common/dto/output.dto';
import { Like } from '../entity/like.entity';

@InputType()
export class DoUndoLikeInput extends PickType(Like, ['target', 'targetId']) {
  @Field((type) => Number, { nullable: true })
  userId?: number;
}

@ObjectType()
export class DoUndoLikeOutput extends CoreOutPut {
  @Field((type) => String, { nullable: true })
  result?: string;
}
